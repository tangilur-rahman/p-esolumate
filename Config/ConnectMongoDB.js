// external modules
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
	.connect(process.env.mongoDB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log(`Connection successfully with MongoDB`))
	.catch((error) => console.log(`connection failed ${error.message}`));

module.exports = mongoose;
