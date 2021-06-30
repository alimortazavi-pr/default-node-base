const User = require('src/models/User');
const middleware = require('src/middlewares/middleware');

class rememberLogin extends middleware {
    handle(req, res, next) {
        if (!req.isAuthenticated()) {
            const rememberToken = req.signedCookies.remember_token;
            if (rememberToken) return this.userFind(rememberToken, req, next);
        }

        next();
    }

    userFind(rememberToken, req, next) {
        User.findOne({
                rememberToken
            })
            .then(user => {
                if (user) {
                    req.logIn(user, err => {
                        if (err) next(err);
                        next();
                    });
                } else
                    next();
            })
            .catch(err => next(err));
    }
}


module.exports = new rememberLogin();