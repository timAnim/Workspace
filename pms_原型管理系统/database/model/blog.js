var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var InteractSchema = new Schema({          
 	"title":{type:String, required:true},
 	"cdate":{type:Date, required:true},
 	"cuid":{type:String, required:true},
 	"cname":{type:String},
 	"tags":{type:Array},
 	"content":{type:String},
 	"cover":{type:String},
});

module.exports = mongoose.model('blog',InteractSchema);