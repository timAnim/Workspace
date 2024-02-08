var mongoose = require('./db.js')
var Schema = mongoose.Schema

var stageSchema = new Schema({
  "title": {
    type: String
  },
  "date": {
    type: Date
  },
});


var prios = ['high', 'regular', 'low']

var planSchema = new Schema({
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  pname: {
    type: String
  },
  puid: {
    type: String
  },
  prio: {
    type: String,
    enum: prios
  },
  name: {
    type: String,
    required: true
  },
});


var ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  code: {
    type: String,
    unique: true,
  },
  cuser: {
    type: String,
    required: true
  },
  cuid: {
    type: String,
    required: true
  },
  cover: {
    type: String
  },
  isPublic:{
    type: Boolean,
    default: false
  },
  description:{
    type: String,
    default: '版本说明'
  },
  proto: {
    type: String
  },
  design: {
    type: String
  },
  productName: {
    type: String
  },
  pid:{
    type: String
  },
  stage: [stageSchema],
  plan: [planSchema],
  staff: {
    type: Array
  },
});

module.exports = mongoose.model('projects', ProjectSchema, 'projects');