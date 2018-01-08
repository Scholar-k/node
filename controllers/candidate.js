const candidateModel = require("../models/candidate.js");

module.exports = {
	addCandidate(req, res) {
		const { name, candidate, salary, address } = req.body;
		const filename = req.file ? req.file.filename : "";

		candidateModel.addCandidate(name, candidate, salary, address, filename, (err) => {
			res.json({
				ret: true,
				data: {
					inserted: !err
				}
			})
		})
	},

	getCandidateList(req, res) {
		const { page, size } = req.query;
		let totalPage = 0;
		candidateModel.getCandidate({}, (result) => {
			if (result && result !== "error") {
				totalPage = Math.ceil(result.length / size)
				candidateModel.getCandidateByPage(page, size, (result) => {
					res.json({
						ret: true,
						data: {
							list: result,
							totalPage: totalPage
						}
					})
				})
			}
		});
	},

	getCandidate(req, res) {
		candidateModel.getCandidateById(req.query.id, (result) => {
			res.json({
				ret: true,
				data: {
					info: (result && result !== 'error') ? result : false
				}
			})
		});
	},

	removeCandidate(req, res) {
		candidateModel.removeItemById(req.query.id, (err) => {
			res.json({
				ret: true,
				data: {
					delete: !err
				}
			})
		})
	},

	updateCandidate(req, res) {
		const {name, candidate, salary, address, id} = req.body;
		const params = {
			name,
			candidate,
			salary,
			address
		}

		if (req.file && req.file.filename) {
			params.filename = req.file.filename
		}

		candidateModel.updateCandidateById(id, params, (result) => {
			res.json({
				ret: true,
				data: {
					update: (result && result !== "error") ? true : false
				}
			})
		})
	}
}