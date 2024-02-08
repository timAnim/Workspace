var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var stageSchema = new Schema({
    "title": { type: String },
    "date": { type: Date },
});

module.exports = stageSchema;