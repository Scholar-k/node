const userModel = require("../models/user.js");
const crypto = require("crypto");

module.exports = {
	register: (req, res) => {
		const {username, password} = req.body;
		const hash = crypto.createHash('sha256');

		hash.update(password);

		userModel.findUser({username: username}, (result) => {
			if (result && result !== "error") {
				res.json({
					ret: true,
					data: {
						register: false
					}
				})
			}else {
				userModel.register(username, hash.digest('hex'), (err) => {
					res.json({
						ret: true,
						data: {
							register: !err
						}
					})
				})
			}
		})
	},

	login: (req, res) => {
		const {username, password} = req.body;
		const hash = crypto.createHash('sha256');

		hash.update(password);

		userModel.findUser({
			username: username,
			password: hash.digest('hex')
		}, (result) => {
			if (result && result !== "error") {
				req.session.username = username;
			}
			res.json({
				ret: true,
				data: {
					login: (result && result !== "error") ? true : false
				}
			})
		})
	},

	isLogin: (req, res) => {
		res.json({
			ret: true,
			data: {
				isLogin: req.session.username ? true : false
			}
		})
	},

	logout: (req, res) => {
		req.session = null;
		res.json({
			ret: true,
			data: {
				logout: true
			}
		})
	},
}