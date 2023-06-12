var express = require('express');
var passport = require('passport');
var User = require('../../models/user');
var bodyParser = require("body-parser");
var router = express.Router();

router.get('/', function(req, res){
    res.render('home/');
});

router.get('/home', function(req, res){
    res.render('home/home');
}); 

router.get('/about', function(req, res){
    res.render('home/about');
});

router.get('/login', function(req, res){
    res.render('home/login');
});

router.get('/register', function(req, res){
    res.render('home/signup');
});

router.post('/login', passport.authenticate("login", {
    successRedirect:"/",
    failureRedirect: "/login", 
    failureFlash:true}));

router.post('/register', function(req, res, next){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email:email}, function(err, user){
        if(err){return next(err);}
        if(user){
            req.flash("error", "User already exists");
            return res.redirect("/register");
        }

        var newUser = new User({
            username:username,
            email:email,
            password:password
        });
        newUser.save(next);
    });
}, passport.authenticate("login", {
    successRedirect:"/home",
    failureRedirect:"/register",
    failureFlash:true
}));

module.exports = router;