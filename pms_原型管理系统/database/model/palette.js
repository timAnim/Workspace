var mongoose = require('./db.js'),
  Schema = mongoose.Schema;

var RelateSchema = new Schema({
  name: { type: String },
  hex: { type: String },
});

var ColorSchema = new Schema({
  name: { type: String },
  hex: { type: String },
  related: [RelateSchema],
});

var PaletteSchema = new Schema({
  name: { type: String },
  des: { type: String },
  cuid: { type: String },
  cuser: { type: String },
  muser: { type: String },
  mdate: { type: Date },
  colors: [ColorSchema],
});

module.exports = mongoose.model('Palette', PaletteSchema);