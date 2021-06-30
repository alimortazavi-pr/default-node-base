const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const uniqid = require('uniqid');

userSchema = Schema({
    name : {type : String , required : true},
    admin : {type : Boolean , default : false},
    mobile : {type : String , required : true},
    password : {type : String , required : true},
},{timestamps : true});

userSchema.pre('save' , function(next) {
    let salt = bcrypt.genSaltSync(15);
    let hash = bcrypt.hashSync(this.password , salt);

    this.password = hash;
    next();
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password , this.password);
}

userSchema.methods.setRememberToken = function(res) {
    const token = uniqid();
    res.cookie('remember_token' , token , { maxAge : 1000 * 60 * 60 * 24 * 90 , httpOnly : true , signed :true});
    this.update({ rememberToken : token } , err => {
        if(err) console.log(err);
    });
}

module.exports = mongoose.model('User' , userSchema);