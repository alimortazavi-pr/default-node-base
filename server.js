require('app-module-path').addPath(__dirname)
const App = require('./src');
require('dotenv').config();
global.config = require('./config');

new App();