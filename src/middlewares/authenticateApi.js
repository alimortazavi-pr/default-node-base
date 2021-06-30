const middleware = require('src/middlewares/middleware');
const passport = require('passport');

class authenticateApi extends middleware {

    handle(req, res, next) {
        passport.authenticate('jwt', {
            session: false
        }, (err, user, info) => {

            if (err || !user)
                return res.status(401).json({
                    data: info.message || 'You dont have permission.',
                    status: 'error'
                })

            req.user = user;

            next();
        })(req, res, next);
    }


}


module.exports = new authenticateApi();