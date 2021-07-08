var express = require("express");
var router = express.Router();
var Cg= require("../models/campgrounds");
var passport=require("passport");
var User = require("../models/user")

// AuthenticatiRoutesute
// ++++++++++++++++++++++++++++++++++++++++++

router.get("/register",function(req,res){
	res.render("register");
	
})

router.post("/register",function(req,res){
	var newUser=new User({username:req.body.username});
User.register(newUser,req.body.password,function(err,user){
	if(err){
		console.log(err);
		return res.render("register");
	}else{
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");
		})
	}
})
})
// ***************************************

// logAuthenticatiRoutesuteute
// ====================================
router.get("/login",function(req,res){
	
	res.render("login");
})


router.post("/login",passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect:"/login"
}),function(req,res){
	
});
// *************************************************

// logout
// =====================
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
	
});

// is logged function
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect("/login");
	}
	
}
// **********************************

	module.exports = router;