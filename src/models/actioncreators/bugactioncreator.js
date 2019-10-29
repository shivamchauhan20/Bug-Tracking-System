export const bugActionCreator = (filename,bugname,bugtype,bugdescription,status,time,screenshot,url,opr)=>{
    return{
        payload:{filename,bugname,bugtype,bugdescription,status,time,screenshot,url},
        type:opr
    }
 }