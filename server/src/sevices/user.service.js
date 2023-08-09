const { UserModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../sevices/mail.service');
const tokenService = require('../sevices/token.service');
const UserDto = require('../dtos/user.dtos');
const ApiError = require('../exceptions/api.error');

class UserService {
    async registration(email, password){
        const candidate = await UserModel.findOne({email});
        if(candidate){
            //throw new Error(`Пользователь с имейлом ${email} уже существует`)
            throw ApiError.BadRequest(`Пользователь с имейлом ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationCode = uuid.v4();
        const activationLink = `http://localhost:5000/api/activate/${activationCode}`;
        // save user in DB:
        const user = await UserModel.create({email, password: hashPassword, activationLink:activationCode});
        await mailService.sendActivationMail(email, activationLink); // без реализации
        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = tokenService.generateTokens(userDto);
        // save or update refresh token in DB:
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        
        return {
            ...tokens,
            user: userDto,
        }
    }
    async activate(activationLink){
        // find user by activationLink
        const user = await UserModel.findOne({activationLink});
        if(!user){
          //  throw new Error('Некорректная ссылка активации пользователя')
              throw ApiError.BadRequest(`Некорректная ссылка активации пользователя`);
        }
        user.isActivated = true;
        await user.save();
    }
}

module.exports = new UserService();