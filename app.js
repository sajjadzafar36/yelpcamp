var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var Campground  = require("./models/campgrounds");
var Comment     = require("./models/comments");
var passport    = require("passport");
var LocalStrategy = require("passport-local");
var session     = require("express-session");
var User        = require("./models/user");
var methorOverride  = require("method-override");
var seedDb      = require("./seeds");
var flash       = require("connect-flash");

var indexRoutes = require("./routes/index"),
    campgroundRoutes = require("./routes/campground"),
    commentRoutes    = require("./routes/comment");

//seedDb(); //not seeding it anymore

//console.log(process.env.DATABASEURL);

//database connection & creating new database
mongoose.connect("process.env.DATABASEURL",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});


// mongoose.connect("mongodb+srv://asher:asher@yelpcamp-ttflj.mongodb.net/<dbname>?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
//mongodb+srv://asher:asher@yelpcamp-ttflj.mongodb.net/<dbname>?retryWrites=true&w=majority

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

app.use(methorOverride("_method"));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(flash());



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT || 3000, function(){
    console.log("YelpCamp Server has started!");
});