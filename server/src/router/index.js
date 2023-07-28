const {Router} = require('express');
const userController = require('../controllers/user.controller');

// Router instance
const router = new Router();

// routes:
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers); // test endpoints

module.exports = router;