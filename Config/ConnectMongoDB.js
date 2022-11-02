const mongoose = require("mongoose");

mongoose
	.connect(process.env.mongoDB_URL)
	.then(() => console.log(`Connection successfully with MongoDB`))
	.catch((error) => console.log(`connection failed ${error.message}`));

module.exports = mongoose;
