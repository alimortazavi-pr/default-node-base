const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const Helpers = require('src/helpers');
const methodOverride = require('method-override');
const csrf = require('csurf');

//Middlewares
const csrfErrorHandler = require('src/middlewares/csrfErrorHandler');
const rememberLogin = require('src/middlewares/rememberLogin');

module.exports = class Application {
    constructor() {
        this.server();
        this.db();
        this.config();
        this.routes();
    }

    server() {
        const server = http.createServer(app);
        server.listen(config.port, () => console.log(`
            Server is running on port ${config.port} ...
            Website URL : ${config.siteurl}
        `));
    }

    db() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    config() {
        app.use(express.static(config.layout.public_dir));

        app.set('view engine', config.layout.view_engine);
        app.set('views', config.layout.view_dir);
        app.use(config.layout.ejs.expressLayouts);
        app.set("layout extractScripts", config.layout.ejs.extractScripts);
        app.set("layout extractStyles", config.layout.ejs.extractStyles);
        app.set("layout", config.layout.ejs.master);

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(methodOverride('_method'));

        app.use(session({
            ...config.session
        }));
        app.use(cookieParser(config.cookie_secretkey));
        app.use(flash());
        
        require('src/passport/passport-local');
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(rememberLogin.handle);

        app.use((req, res, next) => {
            app.locals = new Helpers(req, res).getObjects();
            next();
        });
    }

    routes() {
        // app.use(require('src/routes/api'));
        app.use(csrf({
            cookie: true
        }), require('src/routes/web'));
        app.use(csrfErrorHandler.handle);
    }
}