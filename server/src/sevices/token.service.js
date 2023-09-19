const jwt = require('jsonwebtoken');
const {TokenModel} = require('../models/token.model');

const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;

class TokenService {
    generateTokens({...payload}){
        const accessToken = jwt.sign(payload, JWT_ACCESS_KEY, {expiresIn: '20m'});
        const refreshToken = jwt.sign(payload, JWT_REFRESH_KEY, {expiresIn: '15d'});
        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await TokenModel.findOne({user: userId});
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            await tokenData.save();
        } else {
            const token = await TokenModel.create({user: userId, refreshToken});
            return token;
        }
        
    }
}

module.exports = new TokenService();