const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('src/controllers/web/home/homeController');

router.get('/' , homeController.index);
router.get('/logout' , homeController.logout);

module.exports = router;