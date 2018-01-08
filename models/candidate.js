var mongoose = require('../utils/database.js')

var Candidate = mongoose.model('candidate', { 
	name: String,
	candidate: String,
	salary: String,
	address: String,
	filename: String
});

module.exports = {
	addCandidate(name, candidate, salary, address, filename, cb) {
		var candidate = new Candidate({name, candidate, salary, address, filename});
		candidate.save(function(err) {
			cb(err)
		})
	},
	getCandidate(params, cb) {
		Candidate.find(params).then((result) => {
			cb(result)
		}).catch(() => {
			cb('error')
		})
	},
	getCandidateByPage(page, size, cb) {
		page = parseInt(page, 10)
		size = parseInt(size, 10)
		Candidate.find({}).limit(size).skip((page -1) * size).then((result) => {
			cb(result)
		}).catch(() => {
			cb('error')
		})
	},
	removeItemById(id, cb) {
		Candidate.findByIdAndRemove(id, (err) => {
			cb(err);
		})
	},
	getCandidateById(id, cb) {
		Candidate.findById(id).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error')
		})
	},
	updateCandidateById(id, params, cb) {
		Candidate.findByIdAndUpdate(id, params).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error")
		})
	}
}