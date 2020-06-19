var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");

var seeds = [
    {   name: "Kaka sb",
        image: "https://i.pinimg.com/236x/69/50/db/6950db40ef901185f41d92f2d4b6e23e.jpg",
        description: "Hi this a cool place very nice for party but the weather is very cool so make sure to bring your warm jackets and emergency blankets as well. And instrument to light fire because without fire you guys will struggle. Hi this a cool place very nice for party but the weather is very cool so make sure to bring your warm jackets and emergency blankets as well. And instrument to light fire because without fire you guys will struggle.Hi this a cool place very nice for party but the weather is very cool so make sure to bring your warm jackets and emergency blankets as well. And instrument to light fire because without fire you guys will struggle."},

    {   name: "Switzerland camping",
        image: "https://i.pinimg.com/236x/7f/dd/bc/7fddbcd9a8a6d5a4dd0707e797774e68.jpg",
        description: "Hi this a cool place very nice for party but the weather is very cool so make sure to bring your warm jackets and emergency blankets as well. And instrument to light fire because without fire you guys will struggle. Hi this a cool place very nice for party but the weather is very cool so make sure to bring your warm jackets and emergency blankets as well. And instrument to light fire because without fire you guys will struggle.Hi this a cool place very nice for party but the weather is very cool so make sure to bring your warm jackets and emergency blankets as well. And instrument to light fire because without fire you guys will struggle."},

    {   name: "Hills camping",
        image: "https://i.pinimg.com/236x/c0/e8/be/c0e8be91311fe7a01d7a50fb3b547816.jpg",
        description: "Hi this a cool place very nice for party but the weather is very cool so make sure to bring your warm jackets and emergency blankets as well. And instrument to light fire because without fire you guys will struggle. Hi this a cool place very nice for party but the weather is very cool so make sure to bring your warm jackets and emergency blankets as well. And instrument to light fire because without fire you guys will struggle.Hi this a cool place very nice for party but the weather is very cool so make sure to bring your warm jackets and emergency blankets as well. And instrument to light fire because without fire you guys will struggle."}
]

function seedDb(){
    // removing previous comments
    Comment.deleteMany({}, function(err, done){
        if(err){
            console.log(err);
        }else{
            console.log("Comments deleted");
        }
    });

    // removing previous campgrounds
    Campground.deleteMany({}, function(err){
       if(err){
           console.log(err);
        }else{
            console.log("Campgrounds Removed");
                // add few campgrounds
                seeds.forEach(function(seed){
                  Campground.create(seed, function(err, createdCampground){
                      if(err){
                        console.log(err);
                             }else{
                               console.log("Campground Created");
                               // create a comment
                               Comment.create({
                                   text : "This is a nice place but the weather yoo too cold",
                                   author : "Rocky"
                               }, function( err,  createdComment){
                                   if(err){
                                       console.log(err);
                                   }else{
                                            createdCampground.comments.push(createdComment);
                                            createdCampground.save();
                                            console.log("Comment created")
                                        }
                               });
                                  }
                  });
         });
             }
   });

    
    

   // add few comments
}

module.exports = seedDb;

