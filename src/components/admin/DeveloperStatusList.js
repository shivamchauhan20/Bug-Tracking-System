import React from 'react';
import {connect} from 'react-redux';
const DeveloperStatusList = (props)=>{
    return(
        <>      
        <h1 className='p'>Bug Tracker</h1>
        <table className="table table-hover"> 
           <thead  className="bg-info">
                    <tr>
                      <th scope="row">S.No</th>
                      <th scope="row">Developer Name</th>
                      <th scope="row">Project Name</th>
                      <th scope="row">Bug Name</th>
                      <th scope="row">Time Taken</th>
                    </tr>
                  </thead>
                  <tbody className="table-info">
                    {props.result.map((singleBug,index) => (
                       <tr key={index}>
                       <td>{index+1}</td>
                       <td>{singleBug.developername}</td>
                       <td>{singleBug.bug.filename}</td>
                       <td>{singleBug.bug.bugname}</td>
                       <td>{singleBug.bug.time}</td>
                      </tr>
                    ))}
                  </tbody>       
          </table>
              </>
    )
}
const mapStateToProps = (state)=>{
    var bugs = [];
    console.log('BugList is ',state.bugReducer.bugList);
    for(var bug of state.bugReducer.bugList){
            if(bug.status==='Solved'){
                for(var project of state.projectReducer.projectList){
                    console.log(project.name+' '+bug.filename);
                if(bug.filename===project.name){
                    bugs.push({"bug":bug,"developername":project.developername});
                }
            }
            }
    }
    console.log('Bugs is ',bugs);
    return {
        result:bugs
    }
}
const fn = connect(mapStateToProps);
export default fn(DeveloperStatusList);