import React from 'react';
export const DeleteUser = (props)=>{
    return(
        <div>
            <label>Userid</label><input name='userid' onChange={props.takeInput} type='text' placeholder="Enter the UserID you want to Delete"/>
           <br/>
           <button onClick={props.deleteUser}>Delete</button>
           <br/>
           <button name='adminhome' onClick={props.viewChange}>Back to Homepage</button>
        </div>
    )
}