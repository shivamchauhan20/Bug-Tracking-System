export const userReducer = (initState={userList:[]},action)=>{
console.log('Action is ',action);
if(action.type==='add'){
    var user = [...initState.userList];
    user.push(action.payload);
    console.log('UserList is ',user);
    return initState={userList:user};
}
if(action.type==='edit'){
    var users = initState.userList.map(y=>y);
    var index = users.findIndex(u=>u.userid===action.payload.userid);
    users.splice(index,1);
    return initState={userList:users};
}
return initState;
};