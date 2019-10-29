const passwordhash = require('password-hash');
const UserCollection = require('../models/user');
const jwt = require('../../utils/jwt');
const userOperations = {
    add(userObject,res){
        var hash = passwordhash.generate(userObject.password);
        userObject.password = hash;
        UserCollection.create(userObject,(err)=>{
            if(err){
                res.json({"msg":"Error Occured During Adding to DB"});
                console.log('Error Occured During Adding to DB is ',err);
            }
            else{
                res.json({"msg":"Record Added Successfully"});
            }
        });
    },
    getUsers(res){
        UserCollection.find({},(err,users)=>{  
            if(err){
                res.json({"msg":"Error occured during searching in DB"});
                console.log("Error occured during searching in DB is ",err);
            }
            else if(users){
                var userList = [];
                for(let user of users){
                    if(user.userid=='admin'){
                        continue;
                    }
                    else{
                        userList.push( user);
                    }
                }
                res.json({"users":userList});
            }
        })
    },
    search(userObject,res){
        UserCollection.findOne({'userid':userObject.userid},(err,doc)=>{
            if(err){
                res.json({"msg":"Error occured during searching in DB"});
                console.log("Error occured during searching in DB is ",err);
            }
            else if(doc){
                var result = passwordhash.verify(userObject.password,doc.password);
                if(result){
                    var token = jwt.generateToken(userObject.userid);
                    res.json({"isLoggedIn":"true","msg":"Welcome "+userObject.userid,"role":doc.role,"token":token});
                }
                else{
                    res.json({"isLoggedIn":"false","msg":"Invalid UserId or Password"});
                }
            }
            else{
                res.json({"msg":"Invalid UserId or Password"});
            }
        })
    },
    delete(userid,res){
        UserCollection.remove({"userid":userid},(err)=>{
            if(err){
                res.json({"msg":"Record not Deleted"}); 
                console.log('Error is ',err);
            }
            else{
                res.json({"msg":"Record Deleted Successfully"});
            }
        });
    },
    update(userObject,res){
        UserCollection.findOneAndUpdate({"userid":userObject.userid},{"role":userObject.role},(err)=>{
            if(err){
                res.json({"msg":"Role Updation Failed"});
                console.log('Error is ',err);
            }
            else{
                res.json({"msg":"Role Updated Successfully"});
            }
        });
    },
    changePassword(userObject,res){
        var userInfo = {'userid':userObject.userid,'password':userObject.oldpassword};
        UserCollection.findOne({'userid':userInfo.userid},(err,doc)=>{
            if(err){
                res.json({"msg":"Error occured during searching in DB"});
                console.log("Error occured during searching in DB is ",err);
            }
            else if(doc){
                var result = passwordhash.verify(userInfo.password,doc.password);
                if(result){
                    var hash = passwordhash.generate(userObject.newpassword);
                    userObject.newpassword = hash; 
                   UserCollection.updateOne({'userid':userInfo.userid},{'password':userObject.newpassword},(err)=>{
                       if(err){
                           res.json({"msg":"Error occured During Changing Password"});
                           console.log("Error occured During Changing Password is ",err);
                       }
                       else{
                           res.json({"msg":"Password changed Successfully"});
                       }
                   })
                }
                else{
                    res.json({"msg":"Invalid old Password"});
                }
            }
            else{
                res.json({"msg":"Record Not Found"});
            }
        })
    },
    getEmail(userid,res){
        UserCollection.findOne({'userid':userid},(err,doc)=>{
            if(err){
                res.json({"msg":"Error occured during searching in DB"});
                console.log("Error occured during searching in DB is ",err);
            }
            else if(doc){
                console.log('Email is ',doc.email);
                res.json({"email":doc.email});
            }
            else{
                res.json({"msg":"Invalid UserId"});
            } 
        })
    }
}
module.exports = userOperations;