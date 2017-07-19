const express = require("express")
const mongoose = require("./db/connection.js")
const parser = require("body-parser")

let app = express()

let Challenge = mongoose.model("Challenge")
let Entry = mongoose.model("Entry")

app.set("port", process.env.PORT || 3001)
app.use(parser.json({extended:true}))
app.use(parser.urlencoded({ extended: true }))

app.use("/assets",express.static("src"))



// API routes
app.get("/api/challenge", (req, res)=>{
  Challenge.find({})
  		.then(function(Challenge){
  		res.json(Challenge)
  })
});
app.get("/api/challenge/:type", (req,res)=>{
	Challenge.find({type: req.params.type})
		.then(function(challenge){
			res.json(challenge)
	})
})
app.get("/api/challenge/:type/:id",(req,res)=>{
	Challenge.findOne({_id: req.params.id})
		.then(function(challenge){
			res.json(challenge)
		})
})
app.post("/api/challenge",(req,res)=>{
	Challenge.create(req.body)
		.then(function(newChallenge){
			console.log(req.body )
			res.json(newChallenge)
		})
})
app.put("/api/challenge/:type/:id", (req,res)=>{
	Challenge.findOneAndUpdate({type: req.params.type, _id: req.params.id}, req.body, {new: true})
		.then(function(challenge){
				res.json(challenge)
		})
})
app.delete("/api/challenge/:type/:id", (req,res)=>{
	Challenge.findOneAndRemove({_id: req.params.id})
		.then(function(){
				res.json({success: true})
		})
})

app.get("/*", (req, res)=>{
  res.sendFile(__dirname + "/src/public/index.html");
});


// testing server
app.listen(app.get("port"),function(){
	console.log("Is your refrigerator running?? better catch it on port 3001")
})




// // add sub doc
// function addItem(resturant, item){
//   Restaurant.findOne({name: resturant}, function(err, docs){
//     docs.items.push(new MenuItem({title: item}))
//     docs.save(function(err, results){
//       if(err){
//         console.log(err)
//       }
//       else{
//         console.log(results);
//       }
//     })
//   });
// }

// // Remove sub document
// function removeItem(resturant, item){
//   Restaurant.findOneAndUpdate({name: resturant}, {
//     $pull: { items: {title: item} }
//   },
//   {new: true}, function(err, docs){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log(docs);
//     }
//   });
// }











