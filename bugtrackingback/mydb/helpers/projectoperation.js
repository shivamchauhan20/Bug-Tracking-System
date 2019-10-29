const ProjectCollection = require('../models/project');
const projectOperations = {
    add(projectObject,res){
        ProjectCollection.create(projectObject,(err)=>{
            if(err){
                res.json({"msg":"Error Occured During adding Project to db"});
                console.log('Error is ',err)
            }
            else{
                res.json({"msg":"Project Added to DB Successfully"});
            }
        });
    },
    delete(filename){
        ProjectCollection.findOneAndDelete({"projectname":filename},(err)=>{
            if(err){
                console.log('Error is ',err);
            }
    });
    },
    getDeveloperName(filename,res){
        ProjectCollection.findOne({"projectname":filename},(err,doc)=>{
            if(err){
                res.json({"msg":"Error occured during searching in DB"});
                console.log("Error occured during searching in DB is ",err);
            }
            else if(doc){
                console.log('UserId is ',doc.developername);
                res.json({"userid":doc.developername});
            }
            else{
                res.json({"msg":"Invalid UserId"});
            } 
        })
    }, 
    getProjects(res){
        ProjectCollection.find({},(err,projects)=>{  
            if(err){
                res.json({"msg":"Error occured during searching in DB"});
                console.log("Error occured during searching in DB is ",err);
            }
            else if(projects){
               res.json({"projects":projects});
                }
        })
    }
    
};
module.exports = projectOperations;