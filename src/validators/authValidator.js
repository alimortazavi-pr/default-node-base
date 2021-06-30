const validator = require('./validator');

const {check} = require('express-validator');

class authValidator extends validator{
    register(){
        return [
            check('name','Please Fill Name field.').notEmpty(),
            check('mobile','Please Fill Mobile field.').notEmpty(),
            check('password','The password field must be at least 8 characters long.').isLength({min:8})
        ]
    }

    login(){
        return [
            check('mobile','Please Fill Mobile field.').notEmpty(),
            check('password','Please Fill Password field.').notEmpty()
        ]
    }
}

module.exports = new authValidator;