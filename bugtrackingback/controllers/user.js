const express = require('express');
const route = express.Router();
const fs = require('fs');
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
      destination: function (req, file, cb) {
     // cb(null, 'public')
     let currentPath =  path.normalize(__dirname+"/..");
          cb(null,currentPath+'/uploads/'); // null represent error
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname);
    }
})
var upload = multer({ storage: storage }).single('file')
route.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      //return res.status(200).send(req.file);

    })
    res.json({"msg":"File Uploaded Successfully"});

});
var storagescreen = multer.diskStorage({
    destination: function (req, file, cb) {    
   // cb(null, 'public')
   let currentPath =  path.normalize(__dirname+"/..");
        cb(null,currentPath+'/uploads/screenshot/'); // null represent error
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  }
})
var uploadscreen = multer({ storage: storagescreen }).single('file')
route.post('/uploadscreenshot',function(req, res) {
  uploadscreen(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    //return res.status(200).send(req.file);

  })
  res.json({"msg":"File Uploaded Successfully"});

});
route.post('/openfile/:filename',(req,res)=>{
    var fileName = req.params.filename;
    var filePath = path.join(__dirname,'../uploads/'+fileName);
    fs.readFile(filePath,{encoding:'utf-8'},(err,content)=>{
        if(err){
            console.log('Error during reading is ',err);
            res.json({"msg":"Unable to Read a file"});
        }
        else{
            res.json({"content":content});
        }
    });
});
route.post('/projectlist',(req,res)=>{
    var projectOperations = require('../mydb/helpers/projectoperation');
    projectOperations.getProjects(res);
})
route.post('/deleteproject/:filename',(req,res)=>{
    var filename = req.params.filename;
    var filepath = path.join(__dirname,'../uploads/'+filename);
    const fs = require('fs');
    fs.unlink(filepath, function(err) {
        if(err && err.code == 'ENOENT') {
            // file doens't exist
            res.json({"msg":"File doesn't exist, won't remove it."})
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
            res.json({"msg":"Error occurred while trying to remove file"});
        } else {
            var projectOperations = require('../mydb/helpers/projectoperation');
            projectOperations.delete(filename,res);
            res.json({"msg":"File Removed Successfully"});
        }
    });
})
route.post('/changepassword',(req,res)=>{
    var userObject = req.body;
    var userOperations = require('../mydb/helpers/useroperation');
    userOperations.changePassword(userObject,res);
});
route.post('/addbug',(req,res)=>{
    var bugObject = req.body;
    var bugOperations = require('../mydb/helpers/bugoperation');
    bugOperations.add(bugObject,res);
});
route.post('/buglist',(req,res)=>{
    var bugOperations = require('../mydb/helpers/bugoperation');
    bugOperations.getBugs(res);
});
route.post('/deletebug',(req,res)=>{
    var bugObject = req.body;
    var bugOperations = require('../mydb/helpers/bugoperation');
    bugOperations.deleteBug(bugObject,res);
});
route.post('/updatestatus',(req,res)=>{
    var bugObject = req.body;
    var bugOperations = require('../mydb/helpers/bugoperation');
    bugOperations.update(bugObject,res);
});
route.post('/addproject',(req,res)=>{
    var projectObject = req.body;
    var projectOperations = require('../mydb/helpers/projectoperation');
    projectOperations.add(projectObject,res);
});
route.post('/sendmail',(req,res)=>{
    var mailObject = req.body;
    var mail = require('../utils/mail');
    mail(mailObject.email,mailObject.message,res);
});
route.post('/getdevelopername',(req,res)=>{
    var filename = req.body.filename;
    var projectOperations = require('../mydb/helpers/projectoperation');
    projectOperations.getDeveloperName(filename,res);
});
route.post('/download/:file(*)',(req, res) => {
    var file = req.params.file;
    var fileLocation = path.join(__dirname,'../uploads/'+file);
    res.download(fileLocation,file); 
  });
module.exports = route;