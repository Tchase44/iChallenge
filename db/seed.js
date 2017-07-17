const mongoose = require('./connection.js')
const seedData = require('./seeds.json')

let Challenge = mongoose.model("Challenge")

Challenge.remove({}).then( ()=>{
	Challenge.collection.insert(seedData).then( ()=>{
		console.log('Seeds function exe')
		process.exit()
	})
})