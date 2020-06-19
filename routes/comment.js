var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var User = require("../models/user");
var middleware = require("../middleware");


// ==================================
//  Comments routes section
// ==================================

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn , function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
    
});

// post route for comment creation
router.post("/campgrounds/:id/comments", middleware.isLoggedIn , function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "You do not have permission to do that!!");
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "successfully commented on this campground!!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
});

// edit comment routes
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentAuthor ,function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "You do not have permission to do that!!");
            res.redirect("back");
        } else{
            res.render("comments/edit", {campground_id : req.params.id, comment : foundComment});
        }
    });
    
});

// edit comment routes
// router.get("/campgrounds/:id/comments/:comment_id/edit", function(req, res){
//     if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id, function(err, foundComment){
//             if(err){
//                 res.redirect("back");
//             } else{
//                 if(foundComment.author.id.equals(req.user.id)){
//                     res.render("comments/edit", {campground_id : req.params.id, comment : foundComment});
//                 } else{
//                     res.redirect("back");
//                 }
                
//             }
//         });
//     } else {
//         res.redirect("/login");
//     }
   
    
// });



// comment update route
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentAuthor, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            req.flash("error", "You do not have permission to do that!!");
            res.redirect("back");
        } else {
            req.flash("success", "successfully updated comment on this campground!!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    
});

// delete comment
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentAuthor, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "You do not have permission to do that!!");
            res.redirect("back");
        } else{
            req.flash("success", "successfully deleted comment on this campground!!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});




module.exports = router;