const express = require('express');
const router = express.Router();

// Middlewares
const redirectIfNotAdmin = require('src/middlewares/redirectIfNotAdmin');
const redirectIfNotAuthenticated = require('src/middlewares/redirectIfNotAuthenticated');
const redirectIfAuthenticated = require('src/middlewares/redirectIfAuthenticated');
const errorHandler = require('src/middlewares/errorHandler');

// Admin Router
const adminRouter = require('src/routes/web/admin');
router.use('/admin' , redirectIfNotAdmin.handle , adminRouter);

// Auth Router
const authRouter = require('src/routes/web/auth');
router.use('/auth' , redirectIfAuthenticated.handle , authRouter);

// Home Router
const homeRouter = require('src/routes/web/home');
router.use('/' , homeRouter);

// Handle Errors
router.all('*' , errorHandler.error404);
router.use(errorHandler.handler)



module.exports = router;