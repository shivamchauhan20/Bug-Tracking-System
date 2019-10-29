const mongoose = require('../connection');
var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
    'developername':{type:String, required:true},
    'projectname':{type:String, required:true},
});
var ProjectCollection = mongoose.model('projects',ProjectSchema);
module.exports = ProjectCollection;