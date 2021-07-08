var mongoose = require("mongoose");

//Schema Setup
var CampgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description:String,
	username:String,
	id:String,
	
		comment : [
			{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}
		]
});
//************

module.exports = mongoose.model("Campgrounds",CampgroundSchema);

// ****************************