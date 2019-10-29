export const projectActionCreator = (name,developername,opr)=>{
    return{
        payload:{name,developername},
        type:opr
    }
 }