import React from 'react';
import {connect} from 'react-redux';
const List = (props)=>{
    return(
    <>      
  <h1 className='p'>List of Users</h1>
  <table className="table table-striped table-dark"> 
     <thead>
              <tr>
                <th scope="row">S.No</th>
                <th scope="row">UserID</th>
                <th scope="row">Role</th>
                <th scope="row">Operation</th>
              </tr>
            </thead>
            <tbody>
              {props.result.map((singleUser,index) => (
                  <tr key={index}>
                  <td>{index+1}</td>
                  <td>{singleUser.userid}</td>
                  <td>{singleUser.role}</td>
                  <td> <button className="btn btn-outline-warning" onClick={()=>{props.edit(singleUser)}}><i className="fa fa-pencil-square" aria-hidden="true"></i>Edit</button></td>
                  <td> <button className="btn btn-outline-warning"  onClick={()=>{props.deleteUser(singleUser)}}><i className="fa fa-trash" aria-hidden="true"></i>Delete</button></td>
                </tr>
              ))}
            </tbody>       
    </table>
        </>
    )
}
const mapStateToProps = (state)=>{
    return {
        result:state.userReducer.userList
    }
}
const fn = connect(mapStateToProps);
export default fn(List);