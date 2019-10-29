const express = require('express');
const route = express.Router();
route.post('/adduser',(req,res)=>{
    var userOperations = require('../mydb/helpers/useroperation');
    var userObject = req.body;
    userOperations.add(userObject,res);
});
route.post('/deleteuser',(req,res)=>{
    var userOperations = require('../mydb/helpers/useroperation');
    var userObject = req.body;
    userOperations.delete(userObject.userid,res);
});
route.post('/update',(req,res)=>{
    var userOperations = require('../mydb/helpers/useroperation');
    var userObject = req.body;
    userOperations.update(userObject,res);
});
route.post('/userlist',(req,res)=>{
    var userOperations = require('../mydb/helpers/useroperation');
    userOperations.getUsers(res);
});
route.post('/getemail',(req,res)=>{
    var userid = req.body.userid;
    var userOperations = require('../mydb/helpers/useroperation');
    userOperations.getEmail(userid,res);
});
module.exports = route;