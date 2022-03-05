const mongoose = require('mongoose');

const PortSchema = mongoose.Schema(
	{
		title: {
			type: String,
			require: true
		},
		desc: {
			type: String,
			require: true
		},
		img: {
			type: String,
			require: true
		},
		name: {
			type: String,
			require: true
		},
		creator: {
			type: String,
			require: true
		},
		categories: {
			type: Array,
			require: true
		},
		tags: {
			type: Array
		}
	},
	{ timestamps: true }
);
var Port = mongoose.model('port', PortSchema);
module.exports = Port;
