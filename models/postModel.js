// external modules
const mongoose = require("mongoose");

const schema = mongoose.Schema(
	{
		user_id: {
			type: mongoose.Types.ObjectId,
			ref: "user"
		},

		privacy: {
			type: String,
			trim: true
		},

		text: {
			type: String,
			trim: true,
			default: ""
		},

		category: {
			type: String,
			trim: true,
			default: ""
		},

		attachment: {
			type: String,
			trim: true,
			default: ""
		},

		file_type: {
			type: String,
			trim: true,
			default: ""
		},

		time: {
			type: Date,
			default: Date.now
		},

		reaction: [
			{
				react: String,
				user_id: {
					type: mongoose.Types.ObjectId,
					ref: "user"
				}
			}
		],

		comments: [
			{
				comment: {
					type: String,
					trim: true
				},
				user_id: {
					type: mongoose.Types.ObjectId,
					ref: "user"
				},
				reaction: [
					{
						react: String,
						user_id: {
							type: mongoose.Types.ObjectId,
							ref: "user"
						}
					}
				],

				replays: [
					{
						comment: {
							type: String,
							trim: true
						},
						user_id: {
							type: mongoose.Types.ObjectId,
							ref: "user"
						},
						reaction: [
							{
								react: String,
								user_id: {
									type: mongoose.Types.ObjectId,
									ref: "user"
								}
							}
						]
					}
				],
				time: {
					type: Date,
					default: Date.now
				}
			}
		]
	},
	{ timestamps: true }
);

const postModel = mongoose.model("post", schema);

module.exports = postModel;
