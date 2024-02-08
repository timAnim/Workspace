var mongoose = require('./db.js')
var Schema = mongoose.Schema

var ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  cover: {
    type: String
  },
  material: {
    type: String
  },
  develop: {
    type: String
  },
  product: {
    type: String
  },
  description: {
    type: String
  },
  isClose: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('products', ProductSchema, 'products');