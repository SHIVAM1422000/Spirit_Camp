var Cg= require("../models/campgrounds");
 var middleWare={};

middleWare.checkCampgroundOwnership = function ownership(req,res,next){
	  
//if user is logged in:-
	if(req.isAuthenticated()){
	Cg.findById(req.params.id,function(err,content){
		if(err){
			console.log(err);
			console.log("Error At edit id Line");
		}else{
		// if correct user is logged in:-
		
		 if(req.user._id.equals(content.id)){
				next();
			}else{
				   // else redirect;-
				res.send("Access Denied");
				// res.redirect("back");
			     }
		}
	// ***		
	});
	}
	else{
		res.send("You Need To Be Logged In");
		// console.log("User Not Logged In At Edit Pass");
		// res.redirect("back");
	}
};
	

middleWare.checkCommentOwnership = function ownership(req,res,next){

	//if user is logged in:-
	if(req.isAuthenticated()){
	Cg.findById(req.params.id,function(err,content){
		if(err){
			console.log(err);
			console.log("Error At edit id Line");
		}else{
		// if correct user is logged in:-
		
		 if(req.user._id.equals(content.id)){
				next();
			}else{
				   // else redirect;-
				res.send("Access Denied");
				// res.redirect("back");
			     }
		}
	// ***		
	});
	}
	else{
		res.send("You Need To Be Logged In");
		// console.log("User Not Logged In At Edit Pass");
		// res.redirect("back");
	}
};
	
	
// is logged middleWare:-
// ====================================
 middleWare.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}else{
		// ,{message:req.flash("error")}
		req.flash("error","You Need To Be LoggedIn First");
		res.redirect("/login");
	}
}
// **********************************

module.exports = middleWare;