const express = require("express")
const mongoose = require("./db/connection.js")
const parser = require("body-parser")

let app = express()

let Challenge = mongoose.model("Challenge")
let Entry = mongoose.model("Entry")

app.set("port", process.env.PORT || 3001)
app.use(parser.json({extended:true}))
app.use(parser.urlencoded({ extended: true }))

// app.use("/assets",express.static("public"))


//view engine
app.set('views', __dirname + '/src');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// API routes
app.get("/api/all", function(req, res){
  Challenge.find({})
  		.then(function(Challenge){
  		res.json(Challenge)
  })
});
app.get("/api/challenge/:type", function(req,res){
	Challenge.find({type: req.params.type})
		.then(function(challenge){
			res.json(challenge)
	})
})
app.get("/api/challenge/:type/:id",function(req,res){
	Challenge.findOne({_id: req.params.id})
		.then(function(challenge){
			res.json(challenge)
		})
})
app.post("/api/challenge",function(req,res){
	Challenge.create(req.body)
		.then(function(newChallenge){
			console.log(req.body )
			res.json(newChallenge)
		})
})
app.delete("/api/challenge/:type/:id", function(req,res){
	Challenge.findOneAndRemove({_id: req.params.id})
		.then(function(){
				res.json({success: true})
		})
})
app.put("/api/challenge/:type/:id", function(req,res){
	Challenge.findOneAndUpdate({_id: req.params.id})
		.then(function(challenge){
				res.json(challenge)
		})
})

app.get("/*", function(req, res){
  res.sendFile(__dirname + "/public/404.html");
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











