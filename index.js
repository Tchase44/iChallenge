const express = require("express")
const mongoose = require("./db/connection.js")
const parser = require("body-parser")

let app = express()


app.set("port", process.env.PORT || 3001)
app.use(parser.json({extended:true}))
// app.use("/assets",express.static("public"))

// API routes



//testing Renders
// app.get("/*", function(req, res){
//   res.sendFile(__dirname + "/src/index.js");
// });

// testing server
app.listen(app.get("port"),function(){
	console.log("Is your refrigerator running?? better catch it on port 3001")
})