// external modules
const mongoose = require("mongoose");

const schema = mongoose.Schema(
	{
		email_phone: {
			type: String,
			trim: true
		},
		code: {
			type: Number,
			trim: true
		},
		expireIn: {
			type: String,
			trim: true
		}
	},
	{ timestamps: true }
);

const otpModel = mongoose.model("otp", schema);

module.exports = otpModel;
