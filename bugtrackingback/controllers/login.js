const express = require('express');
const route = express.Router();
route.post('/login',(req,res)=>{
    var userObject = req.body;
    var userOperations = require('../mydb/helpers/useroperation');
    userOperations.search(userObject,res);
});
module.exports = route;