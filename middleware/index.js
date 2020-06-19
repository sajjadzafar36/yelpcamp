var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");

var middlewareObj = {};

middlewareObj.checkCampgroundAuthor  = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("/campgrounds");
            }else{
                if(foundCampground.author.id.equals(req.user.id)){
                    next();
                } else{
                    req.flash("err", "You do not have permission to do that");
                    res.redirect("back");
                }
                
            }
        });
    } else{
        req.flash("err", "Please log in!!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login!");
    res.redirect("/login");
}

middlewareObj.checkCommentAuthor = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("err", "Please login!");
                res.redirect("back");
            } else{
                if(foundComment.author.id.equals(req.user.id)){
                    next();
                } else{
                    req.flash("err", "You do not have permission to do that");
                    res.redirect("back");
                }
                
            }
        });
    } else {
        req.flash("err", "Please login!!");
        res.redirect("/login");
    }
}


module.exports = middlewareObj;