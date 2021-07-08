var express = require("express");
var app = express();
var flash = require("connect-flash");
app.use(flash());
var Cg= require("./models/campgrounds");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
// var seedDB = require("./seeds");
var Comment=require("./models/comment");
// seedDB();

var User = require("./models/user");

app.use(express.static("public"));

//Data Base Setup:-
 var mongoose = require("mongoose");
//  mongodb+srv://SpiritCamp:SpiritCamp@@siritcamp.tl5gi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
 mongoose.connect("mongodb+srv://SpiritCamp:SpiritCamp@@siritcamp.tl5gi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
// mongoose.connect("mongodb://localhost/yelp_campV5", {useNewUrlParser: true, useUnifiedTopology: true});
// *************************


//Body Parser SEtup:-
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// ******************************

//Passport Configuration:-
// ====================================
var passport= require("passport");
var LocalStrategy= require("passport-local");

app.use(require("express-session")({
		secret:"Jai Siya-Ram",
	    resave:false,
	    saveUninitialized:false
		}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error=req.flash("error");
	next();
})
// *****************************************

// Importig Routes
// ===============================
var commentRoutes = require("./routes/comment"),
	campgroundRoutes = require("./routes/campground"),
	authRoutes = require("./routes/authentication")
;// *************************************



//Home Page
app.get("/",function(req,res){
	res.redirect("/campgrounds");
});

//***//

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);

//**Welcome TO YelpCamp***
app.get("/welcome",function(req,res){
	res.render("welcome");
});
//***//

//listening port
// app.listen(1000,function(){
// console.log("Server started..!!");
// });


app.listen(process.env.PORT,process.env.IP);


