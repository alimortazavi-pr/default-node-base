const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('src/controllers/web/admin/adminController');

router.use((req,res,next)=>{
    res.locals.layout = "admin/master";
    next();
});

router.get('/' , adminController.index);

module.exports = router;