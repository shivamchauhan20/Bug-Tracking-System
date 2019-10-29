import React from 'react';
    // <h1 className='r'>Login</h1>
    //        <label>UserID</label><input className="form-control" name='userid' onChange={props.takeInput} type='text' placeholder="Enter your UserID"/>
    //        <label>Password</label><input className="form-control" name='password' onChange={props.takeInput} type='password' placeholder="Enter your Password"/>
    //        <br/>
    //        <button className="btn btn-primary" name='login' onClick={props.login}><i className="fa fa-sign-in" aria-hidden="true"></i>Sign In</button> 
export const Login = (props)=>{
    return(
    <div className='bgl'> 
    <div className="text-center">
    <div className="form-signin">
      <img className="mb-4" src="https://icon-library.net/images/customer-login-icon/customer-login-icon-27.jpg" alt="" width="100" height="100"/>
      <label className="sr-only">Email address</label>
      <input type="email" name="userid" className="form-control" placeholder="Email address" required autoFocus onChange={props.takeInput}/>
      <label className="sr-only">Password</label>
      <input type="password" name="password" className="form-control" placeholder="Password" required onChange={props.takeInput}/>
      <button className="btn btn-lg btn-primary btn-block" type="submit" name='login' onClick={props.login}>Sign in</button>
      </div>
    </div>
    </div> 
    ) 
}