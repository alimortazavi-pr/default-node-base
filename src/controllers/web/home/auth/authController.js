const controller = require('src/controllers/web/controller');
const passport = require('passport');

class authController extends controller {
    registerForm(req, res, next) {
        try {
            return res.render('home/auth/register');
        } catch (err) {
            next(err);
        }
    }

    async register(req, res, next) {
        try {
            if (!await this.validationData(req)) return this.back(req, res);

            passport.authenticate('local.register', {
                successRedirect: '/',
                failureRedirect: '/auth/register',
                failureFlash: true
            })(req, res, next);
        } catch (err) {
            next(err);
        }
    }

    loginForm(req, res, next) {
        try {
            return res.render('home/auth/login');
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            passport.authenticate('local.login', async (err, user) => {
                if (!user) return res.redirect('/auth/login');

                req.logIn(user, err => {
                    if (req.body.rememberMe) {
                        user.setRememberToken(res);
                    }

                    return res.redirect('/');
                })

            })(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new authController();