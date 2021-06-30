const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('src/models/User');


passport.serializeUser(function(user, done) {
    done(null, user.id);
});
   
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use('local.register' , new localStrategy({
    usernameField : 'mobile',
    passwordField : 'password',
    passReqToCallback : true
} , (req , mobile ,  password , done) => {
    User.findOne({ 'mobile' : mobile } , (err , user) => {
        if(err) return done(err);
        if(user) return done(null , false , req.flash('errors' , 'User is already.'));

        
        const newUser = new User({
            name : req.body.name,
            mobile,
            password
        });

        newUser.save(err => {
            if(err) return done(err , false , req.flash('errors' , 'Please try again.'));
            done(null , newUser);
        })

    })
}))


passport.use('local.login' , new localStrategy({
    usernameField : 'mobile',
    passwordField : 'password',
    passReqToCallback : true
} , (req , mobile ,  password , done) => {
    User.findOne({ 'mobile' : mobile } , (err , user) => {
        if(err) return done(err);

        if(! user || ! user.comparePassword(password)) {
            return done(null , false , req.flash('errors' , 'The information entered is incorrect.'));
        }

        done(null , user);
    })
}))