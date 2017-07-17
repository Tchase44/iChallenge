const mongoose  = require("mongoose");

// Schemas
const EntrySchema = new mongoose.Schema(
		{
			title: String,
			author: String,
			content: String,
			desc: String,
			video_url: String,
			photo_url: String
		}
	)

const ChallengeSchema = new mongoose.Schema(
  {
    title: String,
    creator: String,
    type: String,
    // expDate: Date,
    expired: Boolean,
    submissions: [EntrySchema]
  }
)
/**  
 Couldn't decide, one entry schema with all properties
 Or seperate schemas for each type of entry
**/
// const TextSubmission = new mongoose.Schema(
// 		{
// 			title: String,
// 			author: String,
// 			content: String
// 		}
// 	)
// const PhotoSubmission = new mongoose.Schema(
// 		{
// 			title: String,
// 			desc: String,
// 			photo_url: String
// 		}
// 	)
// const VideoSubmission = new mongoose.Schema(
// 		{
// 			title: String,
// 			desc: String,
// 			video_url: String
// 		}
// 	)







mongoose.model("Entry", EntrySchema)
mongoose.model("Challenge", ChallengeSchema)
// mongoose.model("Text", TextSubmission)
// mongoose.model("Photo", PhotoSubmission)
// mongoose.model("Video", VideoSubmission)
mongoose.connect("mongodb://localhost/ichallenge");

module.exports = mongoose;






