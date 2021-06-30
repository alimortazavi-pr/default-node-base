const autoBind = require('auto-bind');
const { validationResult } = require('express-validator');

class Controller {
    constructor(){
        autoBind(this);
    }

    async validationData(req) {
        const errors = validationResult(req);
        const easyError = errors.array().map(err => err.msg);
        if(!errors.isEmpty()){
            req.flash('errors',easyError);
            return false;
        }

        return true;
    }

    back(req , res) {
        req.flash('formData' , req.body);
        return res.redirect(req.header('Referer') || '/');
    }
}

module.exports = Controller;