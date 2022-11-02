// external modules
const path = require("path");
let file = require("fs");

// for deleting profile img & cover
const deleteProfileImg = async (req, res, next) => {
	const whichOne = req.query.whichOne;

	if (whichOne === "cover") {
		if (req.currentUser.cover_img === "default-cover.png") {
			next();
		} else {
			// const getFilePath = path.resolve(
			// 	`../client/public/uploads/profile-img/${req.currentUser.cover_img}`
			// );

			const getFilePath = `./build/uploads/profile-img/${req.currentUser.cover_img}`;

			await file.unlink(getFilePath, (error) => {
				if (error) {
					next();
				} else {
					next();
				}
			});
		}
	} else if (whichOne === "profile") {
		if (req.currentUser.profile_img === "default-profile.png") {
			next();
		} else {
			// const getFilePath = path.resolve(
			// 	`../client/public/uploads/profile-img/${req.currentUser.profile_img}`
			// );

			const getFilePath = `./build/uploads/profile-img/${req.currentUser.profile_img}`;

			await file.unlink(getFilePath, (error) => {
				if (error) {
					next();
				} else {
					next();
				}
			});
		}
	} else {
		res.status(500).json({ error: "Maintenance mode, Try again later!" });
	}
};

// for deleting user's features
const deleteFeatureImg = async (req, res, next) => {
	// const getFilePath = path.resolve(
	// 	`../client/public/uploads/profile-img/${req.query.img}`
	// );

	const getFilePath = `./build/uploads/profile-img/${req.query.img}`;

	await file.unlink(getFilePath, (error) => {
		if (error) {
			next();
		} else {
			next();
		}
	});
};

module.exports = { deleteProfileImg, deleteFeatureImg };
