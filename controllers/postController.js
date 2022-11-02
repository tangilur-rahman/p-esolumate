// external modules

// internal modules
const postModel = require("./../models/postModel");

// for submitting post with attachment or without
const submitAttachments = async (req, res) => {
	try {
		const { text, privacy, category } = req.body;
		const fileName = req.file ? req.file.filename : "";

		// for getting file_type start
		const ext = fileName && fileName.split(".").slice(-1)[0];

		const selectType = () => {
			if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "gif") {
				return "image";
			} else if (
				ext === "mp4" ||
				ext === "mov" ||
				ext === "wmv" ||
				ext === "avi" ||
				ext === "mkv" ||
				ext === "flv" ||
				ext === "mvk"
			) {
				return "video";
			} else if (ext === "mp3" || ext === "ogg" || ext === "WAV") {
				return "audio";
			} else if (ext === "pdf") {
				return "document";
			} else {
				throw new Error("Invalid File Extension");
			}
		};

		const file_type = fileName ? await selectType() : "";
		// for getting file_type end

		const document = await postModel({
			user_id: req.currentUser._id,
			category,
			privacy,
			text,
			attachment: fileName,
			file_type
		});
		await document.save();

		res.status(200).json({ message: "Upload successfully." });
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for returning specific profile's all posts
const profilePosts = async (req, res) => {
	try {
		const document = await postModel
			.find({ user_id: req.params.profile_id })
			.populate("user_id", "name profile_img")
			.populate("reaction.user_id", "name")
			.populate("comments.user_id", "name profile_img")
			.populate("comments.replays.user_id", "name profile_img");

		if (document) {
			res.status(200).json(document);
		}
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for updating reaction
const updateReact = async (req, res) => {
	try {
		const { user_id, post_id, react } = req.body;

		const document = await postModel.findOne({
			user_id,
			_id: post_id,
			reaction: { $elemMatch: { user_id } }
		});

		if (document) {
			await postModel.updateOne(
				{
					user_id,
					_id: post_id,
					reaction: { $elemMatch: { user_id } }
				},
				{ $set: { "reaction.$.react": react, "reaction.$.user_id": user_id } }
			);
		} else {
			const getPost = await postModel.findOne({
				user_id,
				_id: post_id
			});

			getPost.reaction.push({
				react,
				user_id
			});
			await getPost.save();
		}

		res.status(200).json({ message: "updated" });
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for updating comment
const updateComment = async (req, res) => {
	try {
		const { user_id, post_id, comment } = req.body;

		await postModel.updateOne(
			{ user_id, _id: post_id },
			{
				$push: {
					comments: {
						comment,
						user_id
					}
				}
			}
		);

		res.status(200).json({ message: "updated" });
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for updating comment-reaction
const updateCommentReact = async (req, res) => {
	try {
		const { user_id, post_id, comments_id, react } = req.body;

		await postModel.updateOne(
			{
				user_id: user_id._id,
				_id: post_id,
				comments: { $elemMatch: { _id: comments_id } }
			},
			{
				$push: {
					"comments.$.reaction": {
						react,
						user_id: user_id._id
					}
				}
			}
		);

		res.status(200).json({ message: "updated" });
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for updating comment-reply
const updateCommentReply = async (req, res) => {
	try {
		const { user_id, post_id, comments_id, comment } = req.body;

		await postModel.updateOne(
			{ user_id, _id: post_id, comments: { $elemMatch: { _id: comments_id } } },
			{
				$push: {
					"comments.$.replays": {
						comment,
						user_id
					}
				}
			}
		);

		res.status(200).json({ message: "updated" });
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for getting specific post when it updating
const getSpecificPost = async (req, res) => {
	try {
		const { user_id, post_id } = req.params;

		const document = await postModel
			.findOne({ user_id, _id: post_id })
			.populate("reaction.user_id", "name")
			.populate("comments.user_id", "name profile_img");

		if (document) {
			res.status(200).json(document);
		} else {
			res.status(500).json({ error: "Maintenance mode, Try again later!" });
		}
	} catch (error) {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

module.exports = {
	submitAttachments,
	profilePosts,
	updateReact,
	updateComment,
	updateCommentReact,
	updateCommentReply,
	getSpecificPost
};
