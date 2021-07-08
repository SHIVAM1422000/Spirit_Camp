var express = require("express");
var router = express.Router();
var Cg= require("../models/campgrounds");
var Comment= require("../models/comment");
var methodOverride = require("method-override");
var middleWare = require("../middleWare");

router.get("/campgrounds/:id/comment/new",middleWare.isLoggedIn,function(req,res){
	Cg.findById(req.params.id,function(err,camp){
				if(err){
					console.log(err);
				}else{
					
					res.render("commentnew", {Cg:camp,cu:req.user});
				}
				});
});
	router.post("/campgrounds/:id/comment",middleWare.isLoggedIn,function(req,res){
	
		Cg.findById(req.params.id,function(err,camp){
				if(err){
					console.log(err);
				}else{
					var text= req.body.text;
					var author=req.body.author;
					// var authorid=req.body.authorid;
					var newComment = {text:text,author:author};
			Comment.create(newComment,function(err,comment){
						if(err){
							console.log(err);
						}else{
							camp.comment.push(comment);
							camp.save();
							res.redirect("/campgrounds/"+camp._id);
							
						}
					});
					
				}
				});
});



     //Comment update Router:-
// =============================
router.get("/campgrounds/:id/comment/:cid/edit",middleWare.checkCommentOwnership,function(req,res){
	
Comment.findById(req.params.cid,function(err,comment){
	if(err){
		
		console.log(err);
	}else{
	res.render("commentedt",{comment:comment,cgs:req.params.id});
		
	}
})
});
	
 // router edit comment put:-

router.put("/campgrounds/:id/comment",middleWare.checkCommentOwnership,function(req,res){
	
	var Commentid = req.body.commentid;
	var text = req.body.comment;
	var author = req.body.author;
	var newComment = {text:text,author:author};
	console.log("req.params.id "+req.params.cid);

	Comment.findByIdAndUpdate(Commentid,newComment,function(err,update){
		if(err){
						console.log(err);
		}else{
			
			res.redirect('/campgrounds/'+req.params.id);
			}
})
})

// 	**************************
	// Comment Delete Route
// ============================================
router.delete("/campgrounds/:id/comment/:cid",middleWare.checkCommentOwnership,function(req,res){
			Comment.findByIdAndRemove(req.params.cid,function(err){
				if(err){
					res.send("Something Went Wrong in del");
					console.log("not passed del..!!");
					console.log(err);
				}else{
					
					res.redirect("/campgrounds/"+req.params.id);
				}
			})

});
// **************************
 

	
module.exports = router;
