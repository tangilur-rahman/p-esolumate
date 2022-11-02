// external modules
const post = require("express").Router();

// internal modules
const authUser = require("./../middleware/authUser");
const { multerForAttachment } = require("./../Config/multerManager");

const {
	submitAttachments,
	profilePosts,
	updateReact,
	updateComment,
	updateCommentReact,
	getSpecificPost,
	updateCommentReply
} = require("./../controllers/postController");

// for submitting post with attachment or without
const uploadAtt = multerForAttachment("file");

post.post("/attachment", authUser, uploadAtt.single("file"), submitAttachments);

// for returning specific profile's all posts
post.get("/profile/:profile_id", authUser, profilePosts);

// for updating reaction
post.post("/react", updateReact);

// for updating comment
post.post("/comment", updateComment);

// for updating comment-reaction
post.post("/comment/react", updateCommentReact);

// for updating comment's reply
post.post("/comment/reply", updateCommentReply);

// for getting specific post when it updating
post.get("/updating/:user_id/:post_id", getSpecificPost);

module.exports = post;
