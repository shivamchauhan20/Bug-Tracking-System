const mongoose = require('../connection');
var Schema = mongoose.Schema;
var BugSchema = new Schema({
    'filename':{type:String, required:true},
    'bugname':{type:String, required:true},
    "bugtype":{type:String,required:true},
    "bugdescription":{type:String,required:true},
    "status":{type:String,required:true},
    "date":{type:Date,required:true},
    "diff":{type:String},
    "screenshot":{type:String},
    "url":{type:String}    
});
var BugCollection = mongoose.model('bugs',BugSchema);
module.exports = BugCollection;