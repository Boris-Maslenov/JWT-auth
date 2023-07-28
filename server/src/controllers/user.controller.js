const UserService = require('../sevices/user.service');

class UserController {
   async registration(req, res, next){
        try {
            const {email, password} = req.body;
            const userData = await UserService.registration(email, password);
            // refresh будем хранить в httpOnly куках
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch(e) {
            console.log(e.message)
            return res.json(e.message);
        }
   } 
   async login(req, res, next){
        try {

        } catch(e) {
            console.log(e);
        }
    } 
    async logout(req, res, next){
        try {

        } catch(e) {
            console.log(e);
        }
    } 
    async activate(req, res, next){
        try {

        } catch(e) {
            console.log(e);
        }
    } 
    async refresh(req, res, next){
        try {

        } catch(e) {
            console.log(e);
        }
    } 
    async getUsers(req, res, next){
        try {
            res.json(['1', '2', '3']);
        } catch(e) {
            console.log(e);
        }
    } 
}

module.exports = new UserController();