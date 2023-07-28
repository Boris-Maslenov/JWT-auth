const { UserModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../sevices/mail.service');
const tokenService = require('../sevices/token.service');
const UserDto = require('../dtos/user.dtos');

class UserService {
    async registration(email, password){
        const candidate = await UserModel.findOne({email});
        if(candidate){
            throw new Error(`Пользователь с имейлом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        // save user in DB:
        const user = await UserModel.create({email, password: hashPassword, activationLink});
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
}

module.exports = new UserService();