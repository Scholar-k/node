var mongoose = require('../utils/database.js')

var Position = mongoose.model('position', { 
	company: String,
	position: String,
	salary: String,
	address: String,
	filename: String
});

module.exports = {
	addPosition(company, position, salary, address, filename, cb) {
		var position = new Position({company, position, salary, address, filename});
		position.save(function(err) {
			cb(err)
		})
	},
	getPosition(params, cb) {
		Position.find(params).then((result) => {
			cb(result)
		}).catch(() => {
			cb('error')
		})
	},
	getPositionByPage(page, size, cb) {
		page = parseInt(page, 10)
		size = parseInt(size, 10)
		Position.find({}).limit(size).skip((page -1) * size).then((result) => {
			cb(result)
		}).catch(() => {
			cb('error')
		})
	},
	removeItemById(id, cb) {
		Position.findByIdAndRemove(id, (err) => {
			cb(err);
		})
	},
	getPositionById(id, cb) {
		Position.findById(id).then((result) => {
			cb(result);
		}).catch(() => {
			cb('error')
		})
	},
	updatePositionById(id, params, cb) {
		Position.findByIdAndUpdate(id, params).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error")
		})
	}
}