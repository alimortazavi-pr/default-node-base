const database = require('config/database');
const session = require('config/session');
const layout = require('config/layout');

module.exports = {
    port : process.env.APPLICATION_PORT,
    cookie_secretkey : process.env.COOKIE_SECRETKEY,
    debug : true,
    siteurl : process.env.WEBSITE_URL,
    database,
    session,
    layout,
}