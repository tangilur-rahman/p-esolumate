const jwt = require("jsonwebtoken");
const userModel = require("./../models/userModel");

const tokenVerify = async (req, res, next) => {
	try {
		const user = await jwt.verify(
			req.cookies.esoulmate,
			process.env.SECRET_KEY
		);

		const document = await userModel.findOne({
			_id: user._id
		});

		req.currentUser = document;

		next();
	} catch (error) {
		res.status(500).json({ error: "Authentication Failed!" });
	}
};

module.exports = tokenVerify;
