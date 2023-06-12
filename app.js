// dependencies 
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require("connect-flash");
var params = require("./params/params");
var setupPassport = require("./setuppassport");
var bodyParser = require("body-parser");

var app = express();
mongoose.connect(params.DATABASE_CONNECTION);
setupPassport();

// sets
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));

// uses
app.use("/", require('./routes/web'));
app.use("/api", require('./routes/api'));
app.use(cookieParser());
app.use(session({
    secret:"sdahfsawiudadssajkdb",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(flash());

// launch
app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port") + "\nLink: http://localhost:3000\nPress Ctrl-C to terminate");
})