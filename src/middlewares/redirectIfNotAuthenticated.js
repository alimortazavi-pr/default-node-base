const middleware = require('src/middlewares/middleware');

class redirectIfAuthenticated extends middleware {
    
    handle(req , res ,next) {
        if(req.isAuthenticated())
            return next();

        return res.redirect('/auth/login')
    }


}


module.exports = new redirectIfAuthenticated();