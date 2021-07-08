var express = require("express");
var router = express.Router();
var Cg= require("../models/campgrounds");
var Comment= require("../models/comment");
var methodOverride = require("method-override");
var middleWare = require("../middleWare");
// router.use(methodOverride("_method"));

    //***Camp Home PAge Ground Route..!!
router.get("/campgrounds", function(req,res){
	
	
	Cg.find({},function(err,Cgbody){
		if(err){
			console.log("Something Went Wrong");
			console.log(err);
		}else{
			
res.render("campgrounds",{campgrounds:Cgbody,currentUser:req.user});
		}
	});
	
});
//***

//***getting Campground data from user***
router.get("/campgrounds/new",middleWare.isLoggedIn,function(req,res){
	//getting data from form
	res.render("new",{cu:req.user});
// res.redirect("/campgrounds");
	//redirect to campground page
	
});
//****/

// Show Route For campground/:id :-
// ==================================
router.get("/campgrounds/:id",function(req,res){
	//finding campground id:-
	Cg.findById(req.params.id).populate("comment").exec(function(err,comment){
		if(err){
			
			console.log(err);
		}else{
			
			res.render("id",{cgs:comment,currentUser:req.user});
			}
}); 
				
	//*********************
});

// ******************************************************

//*** Posting New Campground***
router.post("/campgrounds",middleWare.isLoggedIn,function(req,res){
	
	//getting data from form:-
	
var name=req.body.name;
var image=req.body.image;
var dis=req.body.description;
var cn = req.body.commenterName;
	var cid = req.body.commenterid;

	
var newCampground = {name:name,image:image,username:cn,description:dis,id:cid};
	
	Cg.create(newCampground,function(err,body){
		if(err){
			console.log(err);
			console.log("Something Went Wrong");
		}else{
			
			//redirect to campground page
			res.redirect("/campgrounds");
		}
	});
});
	
//*********************************/

  //+++++++++"Edit Campground Route"+++++++++++// =====================================================
router.get("/campgrounds/:id/editcg",middleWare.checkCampgroundOwnership,function(req,res){
	
	Cg.findById(req.params.id,function(err,content){
	res.render("editcg",{cgs:content,cu:req.user});
	})
});	
	

router.put("/campgrounds/:id",middleWare.checkCampgroundOwnership,function(req,res){
	
var editname=req.body.name;
var editimage=req.body.image;
var editdis=req.body.description;
var editcn = req.body.cuser;
	var rid=req.params.id
var editnewCampground ={name:editname,image:editimage,description:editdis,username:editcn};
	
	
	
	Cg.findByIdAndUpdate(rid,editnewCampground,function(err,updatedBody){
		if(err){
			console.log(err);
		}else{
			// res.render("commentedt",{cmt:body});
				res.redirect("/campgrounds/"+req.params.id);
		}
	
})
});
	// *****************************
			
	
// 		
// 	})
// })}
// **********************************************************

          // Delete route
// ===================================================
router.delete("/campgrounds/:id",middleWare.checkCampgroundOwnership,function(req,res){
			Cg.findByIdAndRemove(req.params.id,function(err){
				if(err){
					res.send("Something Went Wrong");
					console.log("not passed..!!");
					console.log(err);
				}else{
					
					res.redirect("/campgrounds");
				}
			})

});
// ************************************************

 
	

module.exports = router;

