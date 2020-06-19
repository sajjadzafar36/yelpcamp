var mongoose = require("mongoose");

// Schema pattern
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username: String ,
    },
       
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
    ]
});

// creating collection and assigning schema pattern
module.exports = mongoose.model("Campground", campgroundSchema);