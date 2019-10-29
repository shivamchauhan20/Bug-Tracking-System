const mongoose = require('../connection');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    'userid':{type:String, required:true, unique:true},
    'password':{type:String, required:true},
    'role':{type:String,required:true},
    'email':{type:String,required:true}
});
var UserCollection = mongoose.model('users',UserSchema);
module.exports = UserCollection;