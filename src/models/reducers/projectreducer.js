export const projectReducer = (initState={projectList:[]},action)=>{
console.log('Action is ',action);
if(action.type==='a'){
    var projects = [...initState.projectList];
    projects.push(action.payload);
    console.log('Project List is ',projects);
    return initState = {projectList:projects};
} 
if(action.type==='delete'){
    var project = initState.projectList.map(y=>y);
    var index = project.findIndex(p=>p.name===action.payload.name);
    project.splice(index,1);
    return initState={projectList:project};
}   
return initState;
};