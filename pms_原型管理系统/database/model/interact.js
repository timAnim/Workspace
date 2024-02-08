var mongoose = require('./db.js'),
	Schema = mongoose.Schema;

var types = ['com', 'dialog', 'list', 'card', 'mark', 'switch']

var InteractSchema = new Schema({
	"name": {
		type: String,
		required: true
	},
	"code": {
		type: String
	},
	"label": {
		type: String
	},
	"cover": {
		type: String
	},
	"type": {
		type: String,
		enum: types
	},
	"content": {
		type: String
	},
	"compatibility": {
		type: Number
	},
	"capability": {
		type: Number
	},
	"usability": {
		type: Number
	},
	"study": {
		type: Number
	},
	"integrity": {
		type: Number
	},
	"recommand": {
		type: Number
	},
});

module.exports = mongoose.model('interact', InteractSchema, 'interact');