const Controller = require('src/controllers/web/controller');

class adminController extends Controller {

    index(req,res,next){
        try {
            return res.render('admin/index');
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new adminController();