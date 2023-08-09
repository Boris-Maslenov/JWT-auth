const userService = require('../sevices/user.service');
// const UserService = require('../sevices/user.service');

class UserController {
   async registration(req, res, next){
        try {
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            // refresh будем хранить в httpOnly куках
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch(e) {
            //console.log(e.message)
            //return res.json(e.message);
            next(e);
        }
   } 
   async login(req, res, next){
        try {

        } catch(e) {
            //console.log(e);
            next(e);
        }
    } 
    async logout(req, res, next){
        try {

        } catch(e) {
            // console.log(e);
            next(e);
        }
    } 
    async activate(req, res, next){
       
        try {
            const activationLink = req.params.link // router.get('/activate/:link',...)
            await userService.activate(activationLink);
            return res.redirect('http://localhost:3000'); //default react app port
        } catch(e) {
            //console.log(e);
            next(e);
        }
    } 
    async refresh(req, res, next){
        try {

        } catch(e) {
            //console.log(e);
            next(e);
        }
    } 
    async getUsers(req, res, next){
        try {
            res.json(['1', '2', '3']);
        } catch(e) {
           // console.log(e);
           next(e);
        }
    } 
}

module.exports = new UserController();