export const userActionCreator = (userid,role,opr)=>{
   return{
       payload:{userid,role},
       type:opr
   }
}