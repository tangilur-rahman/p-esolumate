// external modules
const user = require("express").Router();

// internal modules
const {
	signUp,
	LogIn,
	searchingAccount,
	sendOtpLogIn,
	sendOtpSignUp,
	matchingOtp,
	resetPassword,
	currentUser,
	getProfile,
	changeProfile,
	savingInterest,
	uploadFeature,
	deleteFeature,
	addWorkHandler,
	updateWorkHandler,
	deleteAddWorked
} = require("./../controllers/userController");
const authUser = require("./../middleware/authUser");
const { multerForImg } = require("./../Config/multerManager");

const {
	deleteProfileImg,
	deleteFeatureImg
} = require("./../Config/deleteManager");

// for returning current-user
user.get("/", authUser, currentUser);

// for returning selected profile page
user.get("/:profile_id", authUser, getProfile);

// for signup new people or page
user.post("/sign-up", signUp);

// for login user
user.post("/log-in", LogIn);

// for getting searching-account
user.get("/log-in/searching/:account", searchingAccount);

// for sending otp when log-in
user.get("/log-in/verification/:selected", sendOtpLogIn);

// for sending otp when sign-up
user.get("/sign-up/verification/:selected", sendOtpSignUp);

// for getting & matching otp
user.get("/log-in/verification/otp/:selectedVia/:getCode", matchingOtp);

// for reset-password
user.get("/log-in/reset-password/:email_phone/:newPassword", resetPassword);

// for changing cover & profile-photo
const uploadImg = multerForImg("file");

user.post(
	"/profile",
	authUser,
	deleteProfileImg,
	uploadImg.single("file"),
	changeProfile
);

// for saving interested
user.post("/interested", authUser, savingInterest);

// for uploading new feature
const upload = multerForImg("file");

user.post("/feature/upload", authUser, upload.single("file"), uploadFeature);

// for deleting a feature
user.get(
	"/feature/delete/:feature_id",
	authUser,
	deleteFeatureImg,
	deleteFeature
);

// for adding work
user.post("/about/add-work", addWorkHandler);

// for updating work
user.post("/about/update-work", authUser, updateWorkHandler);

// for deleting added work-place
user.get("/about/add-work/delete/:_id", authUser, deleteAddWorked);

module.exports = user;
