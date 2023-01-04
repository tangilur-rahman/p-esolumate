// external modules
const express = require("express");
const path = require("path");
const cookie = require("cookie-parser");
require("dotenv").config();

// internal modules
const customErrorHandler = require("./middleware/errorHandler");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");

// express server
const app = express();

// connection with mongodb
require("./Config/ConnectMongoDB");

// application-level middleware
app.use(express.json());
app.use(cookie());

// routers
app.use("/user", userRouter);
app.use("/post", postRouter);

// submit on remote server start
if (process.env.NODE_ENV == "production") {
	app.use(express.static("build"));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname + "/build/index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("client disconnected");
	});
}
// submit on remote server end

// error handler
if (process.env.NODE_ENV != "production") {
	app.use(customErrorHandler);
}

// listening port
const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
