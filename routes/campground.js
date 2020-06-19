var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var User = require("../models/user");
var middleware = require("../middleware");

// index route
router.get("/campgrounds", function(req, res){
    
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
    
});

// add new form route
router.get("/campgrounds/new", middleware.isLoggedIn , function(req, res){
    res.render("campgrounds/new");
});


// post route to add rec to db
router.post("/campgrounds", middleware.isLoggedIn , function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc= req.body.description;
    var author = {
                id : req.user.id,
                username : req.user.username
    };
    var campground = {name: name, price: price, image: image, description: desc, author : author};
    //create new record
    Campground.create(campground, function(err, newlyCreatedCampground){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
    
});

// show selected pic route
router.get("/campgrounds/:id", function(req, res){

    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
           // console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// show edit form for campground
// router.get("/campgrounds/:id/edit", function(req, res){

//         Campground.findById(req.params.id, function(err, foundCampground){
//             if(err){
//                 res.redirect("/campgrounds");
//             }else{
//                 res.render("campgrounds/edit", {campground : foundCampground});
//             }
//         });
  
// });


// show edit form for campground
router.get("/campgrounds/:id/edit", middleware.checkCampgroundAuthor, function(req, res){

        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "You do not have permission to do that!!");
                res.redirect("/campgrounds");
            }else{
                res.render("campgrounds/edit", {campground : foundCampground});
                
            }
        });

});

// PUT edit campground logic
router.put("/campgrounds/:id", middleware.checkCampgroundAuthor, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash("error", "You do not have permission to do that!!");
            res.redirect("/campdrounds");
        }else{
            req.flash("success", "successfully updated campground!!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Destroy Campground
router.delete("/campgrounds/:id", middleware.checkCampgroundAuthor, function(req, res){
    Campground.findOneAndDelete(req.params.id, function(err){
        if(err){
            req.flash("error", "You do not have permission to do that!!");
            res.redirect("/campgrounds");
        } else{
            req.flash("success", "successfully deleted campground!!");
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;
