const router = require('express').Router();

//Controllers
const authController = require('src/controllers/web/home/auth/authController');

//Validators
const authValidator = require('src/validators/authValidator');

router.use((req,res,next)=>{
    res.locals.layout = "home/auth/master";
    next();
});

router.get('/register', authController.registerForm);
router.post('/register' , authValidator.register() , authController.register);

router.get('/login', authController.loginForm);
router.post('/login' , authValidator.login() , authController.login);

module.exports = router;