export const bugReducer = (initState={bugList:[]},action)=>{
    console.log('Action is ',action);
    if(action.type==='ad'){
        var bugs = [...initState.bugList];
        bugs.push(action.payload);
        console.log('Bug List is ',bugs);
        return initState = {bugList:bugs};
    } 
    if(action.type==='d'){
        var bug = initState.bugList.map(y=>y);
        var index = bug.findIndex(b=>b.bugname===action.payload.bugname);
        bug.splice(index,1);
        return initState={bugList:bug};
    }   
    return initState;
    };