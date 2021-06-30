const middleware = require('src/middlewares/middleware');

class redirectIfNotAdmin extends middleware {

    handle(req, res, next) {
        if (req.user)
            if (req.user.admin)
                return next();

        return res.redirect('/');
    }


}


module.exports = new redirectIfNotAdmin();