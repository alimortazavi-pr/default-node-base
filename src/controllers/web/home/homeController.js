const Controller = require('src/controllers/web/controller');

class homeController extends Controller {

    index(req,res,next){
        try {
            return res.render('home/index');
        } catch (err) {
            next(err);
        }
    }

    logout(req,res,next){
        try {
            req.logout();
            return res.redirect('/');
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new homeController();