const BugCollection = require('../models/bug');
const bugOperations = {
    add(bugObject,res){
        BugCollection.create(bugObject,(err)=>{
            if(err){
                res.json({"msg":"Error Occured During Adding to DB"});
                console.log('Error Occured During Adding to DB is ',err);
            }
            else{
                res.json({"msg":"Bug Added Successfully"});
            }
        });
    },
    getBugs(res){
        BugCollection.find({},(err,bugs)=>{  
            if(err){
                res.json({"msg":"Error occured during searching in DB"});
                console.log("Error occured during searching in DB is ",err);
            }
            else if(bugs){
                var bugList = [];
                for(let bug of bugs){
                    if(bug.status==='Solved'){
                    var bugObject = {"filename":bug.filename,"bugname":bug.bugname,"bugtype":bug.bugtype,"bugdescription":bug.bugdescription,"status":bug.status,"time":bug.diff,"screenshot":bug.screenshot,"url":bug.url}
                    bugList.push(bugObject);
                    }
                    else{
                        var bugObject = {"filename":bug.filename,"bugname":bug.bugname,"bugtype":bug.bugtype,"bugdescription":bug.bugdescription,"status":bug.status,"time":null,"screenshot":bug.screenshot,"url":bug.url}
                        bugList.push(bugObject);
                    }
                    }
                res.json({"bugs":bugList});
            }
        })
    },
    deleteBug(bugObject,res){
        BugCollection.findOne({"filename":bugObject.filename,"bugname":bugObject.bugname},(err,doc)=>{
                if(err){
                    res.json({"msg":"Bug not Deleted"}); 
                    console.log('Error is ',err);
                }
                else if(doc){
                    BugCollection.findOneAndDelete({"filename":bugObject.filename,"bugname":bugObject.bugname},(err)=>{
                        if(err){
                         res.json({"msg":"Bug not Deleted"});
                         console.log('Error is ',err); 
                        }
                    })
                    var path = require('path');
                    var filename = doc.screenshot;
                    var filepath = path.join(__dirname,'../../uploads/screenshot/'+filename);
                    const fs = require('fs');
                    fs.unlink(filepath, function(err) {
                        if(err && err.code == 'ENOENT') {
                            // file doens't exist
                            res.json({"msg":"File doesn't exist, won't remove it."})
                        } else if (err) {
                            // other errors, e.g. maybe we don't have enough permission
                            console.error("Error occurred while trying to remove file");
                            res.json({"msg":"Error occurred while trying to remove file"});
                        }
                    });                
                    res.json({"msg":"Bug Deleted Successfully"});
                }
        });
    },
    update(bugObject,res){
        BugCollection.findOneAndUpdate({"filename":bugObject.filename,"bugname":bugObject.bugname},{"status":bugObject.status},(err)=>{
        if(err){
                res.json({"msg":"Status Updation Failed"});
                console.log('Error is ',err);
            }
            else{           
                            if(bugObject.status==='Solved'){
                                BugCollection.findOne({"filename":bugObject.filename,"bugname":bugObject.bugname},(err,doc)=>{
                                    if(err){
                                        console.log('Error is ',err);
                                    }
                                    else if(doc){
                                        var date1 = doc.date;
                                        var date2 = new Date(); 
                                        var diff = date2.getTime()-date1.getTime();
                                        var min = Math.floor((diff/1000/60) << 0);
                                        var sec = Math.floor((diff/1000) % 60);
                                        BugCollection.findOneAndUpdate({"filename":bugObject.filename,"bugname":bugObject.bugname},{"diff":min+" minutes and "+sec+" seconds"},(err)=>{
                                            if(err){
                                                    console.log('Error is ',err);
                                            }
                                            else{
                                                res.json({"msg":"Status Updated Successfully","time":min+" minutes and "+sec+" seconds"});
                                            }
                                            }) 
                                    }
                                })
                            }
                            else{
                                res.json({"msg":"Status Updated Successfully"}); 
                            }
            }
        })
       
    }
}
module.exports = bugOperations;