var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var LogSchema = new Schema({
    proj_name: { type: String },
    proj_code: { type: String },
    item: { type: String },
    user: { type: String },
    date: { type: Date ,default:Date.now()},
});

module.exports = mongoose.model('Log', LogSchema);