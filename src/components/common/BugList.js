import React from 'react';
import {connect} from 'react-redux';
const BugList = (props)=>{
    return(
       <>      
        <h1 className='p'>List of Bugs</h1>
        <table className="table table-hover"> 
           <thead  className="bg-info">
                    <tr>
                      <th scope="row">S.No</th>
                      <th scope="row">Project Name</th>
                      <th scope="row">Bug Name</th>
                      <th scope="row">Status</th>
                      <th scope="row">Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.result.map((singleBug,index) => (
                       <tr key={index} className={singleBug.status==='Solved'?"bg-success":"bg-danger"}>
                       <td>{index+1}</td>
                       <td>{singleBug.filename}</td>
                       <td>{singleBug.bugname}</td>
                       <td>{singleBug.status}</td>
                       <td><button className="btn btn-outline-warning" hidden={props.role==='tester'?false:true} onClick={()=>{props.deleteBug(singleBug)}}><i className="fa fa-trash" aria-hidden="true"></i>Delete</button>
                       <button className="btn btn-outline-warning" disabled={singleBug.status==='Solved'?true:false} hidden={props.role==='tester'?true:false} onClick={()=>{props.editBug(singleBug)}}><i className="fa fa-pencil-square" aria-hidden="true"></i>Edit</button></td> 
                      </tr>
                    ))}
                  </tbody>       
          </table>
              </>
    )
}
const mapStateToProps = (state)=>{
    return {
        result:state.bugReducer.bugList
    }
}
const fn = connect(mapStateToProps);
export default fn(BugList);