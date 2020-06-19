var express = require("express");
var router = express.Router();
var passport = require("passport");
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});


// Auth routes

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){

    var newUser = new User({username: req.body.username});

    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "You have successfuly registered! " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// login routes
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local" , {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){

});

// logout routes
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success" , "Successfuly Logged out!");
    res.redirect("/campgrounds");
});




module.exports = router;