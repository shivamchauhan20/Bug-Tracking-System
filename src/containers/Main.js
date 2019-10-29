import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import {Login} from '../components/common/Login';
import {Admin} from '../components/admin/Admin';
import {AddUser} from '../components/admin/AddUser';
import {AddProject} from '../components/developer/AddProject';
import {EditRole} from '../components/admin/EditRole';
import {User} from '../components/developer/User';
import {ChangePassword} from '../components/common/ChangePassword';
import ProjectContent from '../components/common/ProjectContent';
import ProjectList from '../components/common/ProjectList';
import List from '../components/admin/List';
import {Config} from '../utils/config';
import {Header} from '../controllers/Header';
import {userActionCreator} from '../models/actioncreators/useractioncreator';
import {projectActionCreator} from '../models/actioncreators/projectactioncreator';
import {store} from '../models/store';
import axios from 'axios';
import { Tester } from '../components/tester/Tester';
import { Bug } from '../components/tester/Bug';
import { bugActionCreator } from '../models/actioncreators/bugactioncreator';
import BugList from '../components/common/BugList';
import { EditBugStatus } from '../components/developer/EditBugStatus';
import DeveloperStatusList from '../components/admin/DeveloperStatusList';
class Main extends React.Component{
constructor(props){
    super(props);
    this.inputs = {};
    this.view = null;
    this.msg = null;
    this.selectedFile = null;
    this.content = null;
    this.firstTimeAdminLogin = false;
    this.firstTimeUserLogin = false;
    this.state = {file:null,selectedFile:this.selectedFile,firstTimeAdminLogin:this.firstTimeAdminLogin,firstTimeUserLogin:this.firstTimeUserLogin};
}
UNSAFE_componentWillMount(){
    console.log('Component Will Call');
    this.props.history.push('/');
    this.view = 'home';
    window.history.pushState(null, null, window.location.href);
    window.onpopstate =  ()=> {
        window.history.go(1);
    };
}
viewChange(event){
    this.view = event.target.name;
    if(this.view==='home'){
        this.props.history.push('/');
        this.inputs = {};
    }
    else{
        this.props.history.push(this.view);
    }
}
onChangeHandler(event){
    console.log('File is ',event.target.files[0]);
    this.inputs['filename'] = event.target.files[0].name;
    const file    = event.target.files[0];
    const reader  = new FileReader();
    reader.onloadend = () => {
        this.setState({
            file: reader.result
        })
    }
    if (file) {
        reader.readAsDataURL(file);
        this.setState({
            file :reader.result
        })
    } 
    else {
        this.setState({
            file: ""
        })
    }
    this.setState({...this.state,selectedFile:event.target.files[0]});
}
takeInput(event){
    this.inputs[event.target.name] = event.target.value;
}
fetchUsers(){
    console.log('Fetch User Call');
    fetch(Config.BASEURL+Config.FETCHUSERS,{method:'POST',headers: {
        'Content-Type': 'application/json'
    }}).then(response=>response.json()
    .then(users=>{
        var userList = users.users;
        console.log('User List is ',userList); 
        for(var user of userList){
        var action = userActionCreator(user.userid,user.role,'add');
        store.dispatch(action);
        }
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));   
}
fetchProjects(){
    console.log('Fetch Projects Call');
    fetch(Config.BASEURL+Config.FETCHPROJECTS,{method:'POST',headers: {
        'Content-Type': 'application/json'
    }}).then(response=>response.json()
    .then(projects=>{
        console.log('Projects is ',projects)
        var projectList = projects.projects;
        console.log('Project List is ',projectList); 
        for(var project of projectList){
        var action = projectActionCreator(project.projectname,project.developername,'a');
        store.dispatch(action);
        }
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));       
}
fetchBugs(){
    console.log('Fetch Bugs Call');
    fetch(Config.BASEURL+Config.FETCHBUGS,{method:'POST',headers: {
        'Content-Type': 'application/json'
    }}).then(response=>response.json()
    .then(bugs=>{
        console.log('Bugs is ',bugs);
        var bugList = bugs.bugs;
        console.log('Bugs List is ',bugList); 
        for(var bug of bugList){
        var action = bugActionCreator(bug.filename,bug.bugname,bug.bugtype,bug.bugdescription,bug.status,bug.time,bug.screenshot,bug.url,'ad');
        store.dispatch(action);
       }
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));      
}
login(){
    console.log('Login Call');
    var userObject = {"userid":this.inputs['userid'],"password":this.inputs['password']};
    console.log('UserObject is ',userObject);
    fetch(Config.BASEURL+Config.LOGIN,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(userObject)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data); 
        if(data.isLoggedIn==='true'){
            localStorage.userid=this.inputs['userid'];
            localStorage.role=data.role;
            this.msg = data.msg;
            this.view = 'loggedin';
            if(data.role==='admin'){
                if(!this.state.firstTimeAdminLogin){
                this.fetchUsers();
                if(!this.state.firstTimeUserLogin){
                this.fetchProjects();
                this.fetchBugs();
                }
                this.firstTimeAdminLogin = true;
                }
                this.props.history.push('/adminhome');
            }
            else{
                if(!this.state.firstTimeUserLogin){
                    if(!this.state.firstTimeAdminLogin){
                    this.fetchProjects();
                    this.fetchBugs();
                    }
                    this.firstTimeUserLogin = true;
                }
                if(data.role==='developer'){
                this.props.history.push('/userhome');
                }
                if(data.role==='tester'){
                    this.props.history.push('/testerhome');
                    }
            }
           this.setState({...this.state,firstTimeAdminLogin:this.firstTimeAdminLogin,firstTimeUserLogin:this.firstTimeUserLogin}); 
        }
        else{
            alert(data.msg);
        }
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));
   }
addUser(){
    console.log('Add User Call');
    if(this.inputs['role']===undefined){
        this.inputs['role']='developer';
    }
    var userObject = {"userid":this.inputs['userid'],"password":this.inputs['password'],"role":this.inputs['role'],"email":this.inputs['email']};
    console.log('UserObject is ',userObject);
    fetch(Config.BASEURL+Config.ADDUSER,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(userObject)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data); 
        var action = userActionCreator(this.inputs['userid'],this.inputs['role'],'add');
        store.dispatch(action);
        alert(data.msg);
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));    
   }
edit(userObject){
    var action = userActionCreator(userObject.userid,userObject.role,'edit');
    store.dispatch(action);
    this.inputs['userid'] = userObject.userid;
    this.inputs['role'] = userObject.role;
    this.props.history.push('/editrole');
    this.view = 'editrole';
}
editRole(){
    console.log('Edit Role Call');
    var userObject = {"userid":this.inputs['userid'],"role":this.inputs['role']};
    console.log('UserObject is ',userObject);
    fetch(Config.BASEURL+Config.EDITROLE,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(userObject)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data); 
        var action = userActionCreator(this.inputs['userid'],this.inputs['role'],'add');
        store.dispatch(action);
        alert(data.msg);
        this.view = 'adminhome';
        this.props.history.push('/adminhome');
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));      
}  
deleteUser(userObject){
    console.log('Delete User Call');
    var userObj = {"userid":userObject.userid};
    console.log('UserObject is ',userObject);
    fetch(Config.BASEURL+Config.DELETEUSER,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(userObj)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data); 
        var action = userActionCreator(userObject.userid,userObject.role,'edit');
        store.dispatch(action);
        alert(data.msg);
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));  
}
changePassword(){
    console.log('Change Password Call');
    var userObject = {"userid":localStorage.userid,"oldpassword":this.inputs['oldpassword'],"newpassword":this.inputs['newpassword']};
    console.log('UserObject is ',userObject);
    fetch(Config.BASEURL+Config.CHANGEPASSWORD,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(userObject)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data); 
        alert(data.msg);
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));  
}
upload(){
console.log('Upload File Call');    
const data = new FormData()
data.append('file', this.state.selectedFile)
axios.post(Config.BASEURL+Config.UPLOADFILE, data, { 
// receive two    parameter endpoint url ,form data
  })
 .then(data => { // then print response status
    console.log('Data is ',data);   
       var action = projectActionCreator(this.inputs['filename'],localStorage.userid,'a');
       store.dispatch(action);
       alert(data.data.msg);
    var projectObject = {"developername":localStorage.userid,"projectname":this.inputs['filename']};
    console.log('UserObject is ',projectObject);
    fetch(Config.BASEURL+Config.ADDPROJECT,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(projectObject)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data); 
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));     
      })     
}
uploadscreenshot(){
    console.log('Upload ScreenShot Call');    
    const data = new FormData();
    data.append('file', this.state.selectedFile)
    axios.post(Config.BASEURL+Config.UPOLOADSCREENSHOT, data, { 
    // receive two    parameter endpoint url ,form data
      })
     .then(data => { // then print response status
        console.log('Data is ',data);        
    }).catch(e=>console.log('Server Error is ',e))     
    }
openProject(filename){
console.log('Open Project Call');
this.inputs['filename'] = filename;
console.log('File Name is ',this.inputs['filename']);
fetch(Config.BASEURL+Config.OPENPROJECT+filename,{method:'POST',headers: {
    'Content-Type': 'application/json'
}}).then(response=>response.json()
.then(data=>{
    console.log('Content is ',data.content);
    this.content = data.content;
    this.view = 'openproject';
    this.props.history.push('/openproject'); 
})
.catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));  
    }
deleteProject(filename){
console.log('Delete Project Call');
fetch(Config.BASEURL+Config.DELETEPROJECT+filename,{method:'POST',headers: {
    'Content-Type': 'application/json'
}}).then(response=>response.json()
.then(data=>{
    console.log('Data is ',data);
    var action = projectActionCreator(filename,null,'delete');
    store.dispatch(action);
    alert(data.msg);
})
.catch(err=>console.log('Json Error is ',err)))
.catch(e=>console.log('Server Error is ',e));  
}
addBug(filename){
console.log('Add Bug Call');
this.inputs['projectname'] = filename;    
this.inputs['filename'] = '';
this.props.history.push('/bug'); 
this.view = 'bug';
}
submitBug(){
    if(this.inputs['bugtype']===undefined){
        this.inputs['bugtype']='simple';
    }
    var bugObject = {"filename":this.inputs['projectname'],"bugname":this.inputs['bugname'],"bugtype":this.inputs['bugtype'],"bugdescription":this.inputs['bugdescription'],"status":"Unsolved","date":new Date(),"screenshot":this.inputs['filename'],"url":this.state.file};
    console.log('BugObject is ',bugObject);
    fetch(Config.BASEURL+Config.ADDBUG,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(bugObject)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data);
        var action = bugActionCreator(bugObject.filename,bugObject.bugname,bugObject.bugtype,bugObject.bugdescription,bugObject.status,null,bugObject.screenshot,bugObject.url,'ad');
        store.dispatch(action);
        alert(data.msg);
        this.uploadscreenshot();
        this.setState({...this.state,file:null})
        this.sendMail();
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));    
}
sendMail(){
    var filename = {"filename":this.inputs['projectname']};
    console.log('FileName is ',filename);
    fetch(Config.BASEURL+Config.GETDEVELOPERNAME,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(filename)}).then(response=>response.json()
    .then(data=>{
        var userid = {"userid":data.userid};
        console.log('Userid is ',data.userid);
        fetch(Config.BASEURL+Config.GETEMAIL,{method:'POST',headers: {
            'Content-Type': 'application/json'
        },body:JSON.stringify(userid)}).then(response=>response.json()
        .then(data=>{
            console.log('Email is ',data.email);
            var mailObject = {"email":data.email,"message":"Bug Found in project "+this.inputs['projectname ']};
            fetch(Config.BASEURL+Config.SENDMAIL,{method:'POST',headers: {
                'Content-Type': 'application/json'
            },body:JSON.stringify(mailObject)}).then(response=>response.json()
            .then(data=>{
                console.log('Data is ',data);
            })
            .catch(err=>console.log('Json Error is ',err)))
            .catch(e=>console.log('Server Error is ',e));
        })
        .catch(err=>console.log('Json Error is ',err)))
        .catch(e=>console.log('Server Error is ',e));    
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));  
}
deleteBug(bugObject){
console.log('Delete Bug Call');
console.log('Bug Object is ',bugObject);    
fetch(Config.BASEURL+Config.DELETEBUG,{method:'POST',headers: {
    'Content-Type': 'application/json'
},body:JSON.stringify(bugObject)}).then(response=>response.json()
.then(data=>{
    console.log('Data is ',data);
    var action = bugActionCreator(bugObject.filename,bugObject.bugname,bugObject.bugtype,bugObject.bugdescription,bugObject.status,null,bugObject.screenshot,bugObject.url,'d');
    store.dispatch(action);
    alert(data.msg);
})
.catch(err=>console.log('Json Error is ',err)))
.catch(e=>console.log('Server Error is ',e));  
}
editBug(bugObject){
    var action = bugActionCreator(bugObject.filename,bugObject.bugname,bugObject.bugtype,bugObject.bugdescription,bugObject.status,null,bugObject.screenshot,bugObject.url,'d');
    store.dispatch(action);
    this.inputs['projectname'] = bugObject.filename;
    this.inputs['bugname'] = bugObject.bugname;
    this.inputs['bugtype'] = bugObject.bugtype;
    this.inputs['bugdescription'] = bugObject.bugdescription;
    this.inputs['status'] = bugObject.status;
    this.inputs['filename'] = bugObject.screenshot;
    this.view = 'editbugstatus';
    this.props.history.push('/editbugstatus');
    this.setState({...this.state,file:bugObject.url})
}
editBugStatus(){
    console.log('Edit Bug Status Call');
    var bugObject = {"filename":this.inputs['projectname'],"bugname":this.inputs['bugname'],"bugtype":this.inputs['bugtype'],"bugdescription":this.inputs['bugdescription'],"status":this.inputs['status'],"screenshot":this.inputs['filename'],"url":this.state.file};
    console.log('BugObject is ',bugObject);
    fetch(Config.BASEURL+Config.EDITSTATUS,{method:'POST',headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(bugObject)}).then(response=>response.json()
    .then(data=>{
        console.log('Data is ',data); 
        var action = bugActionCreator(bugObject.filename,bugObject.bugname,bugObject.bugtype,bugObject.bugdescription,bugObject.status,data.time,bugObject.screenshot,bugObject.url,'ad');
        store.dispatch(action);
        alert(data.msg);
        this.view = 'userhome';
        this.props.history.push('/userhome');
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));      
}
download(filename){
    fetch(Config.BASEURL+Config.DOWNLOAD+filename,{method:'POST',headers: {
        'Content-Type': 'application/json'
    }}).then(response=>response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
    })
    .catch(err=>console.log('Json Error is ',err)))
    .catch(e=>console.log('Server Error is ',e));     
}
render(){
    return(
        <div>
        <div hidden={this.view==='loggedin'?false:this.view==='adminhome'?false:this.view==='list'?false:this.view==='userhome'?false:this.view==='projectlist'?false:this.view==='testerhome'?false:this.view==='buglist'?false:true}>    
        <Header userid={localStorage.userid} role={localStorage.role}/>
        <hr/>
        </div>
        <Switch>
        <Route exact path='/' render={()=><Login login={this.login.bind(this)} takeInput={this.takeInput.bind(this)}/>}/>
        <Route path='/adminhome' render={()=><Admin msg={this.msg} viewChange={this.viewChange.bind(this)}/>}/>
        <Route path='/adduser' render={()=><AddUser addUser={this.addUser.bind(this)} viewChange={this.viewChange.bind(this)} takeInput={this.takeInput.bind(this)}/>}/>
        <Route path='/list' render={()=><List edit={this.edit.bind(this)} deleteUser={this.deleteUser.bind(this)}/>}/>
        <Route path='/bugtracker' render={()=><DeveloperStatusList/>}/>
        <Route path='/editrole' render={()=><EditRole userid={this.inputs['userid']} role={this.inputs['role']} editRole={this.editRole.bind(this)} takeInput={this.takeInput.bind(this)}/>}/>
        <Route path='/changepassword' render={()=><ChangePassword role={localStorage.role} userid={localStorage.userid} changePassword={this.changePassword.bind(this)} takeInput={this.takeInput.bind(this)} viewChange={this.viewChange.bind(this)}/>}/>        
        <Route path='/userhome' render={()=><User msg={this.msg} viewChange={this.viewChange.bind(this)}/>}/>
        <Route path='/projectlist' render={()=><ProjectList role={localStorage.role} addBug={this.addBug.bind(this)} openProject={this.openProject.bind(this)} deleteProject={this.deleteProject.bind(this)} download={this.download.bind(this)}/>}/>
        <Route path='/addproject' render={()=><AddProject viewChange={this.viewChange.bind(this)} onChangeHandler={this.onChangeHandler.bind(this)} upload={this.upload.bind(this)}/>}/>        
        <Route path='/openproject' render={()=><ProjectContent role={localStorage.role} filename={this.inputs['filename']} content={this.content} viewChange={this.viewChange.bind(this)}/>}/>        
        <Route path='/testerhome' render={()=><Tester msg={this.msg} viewChange={this.viewChange.bind(this)}/>}/>                    
        <Route path='/bug' render={()=><Bug takeInput={this.takeInput.bind(this)} filename={this.inputs['projectname']} viewChange={this.viewChange.bind(this)} onChangeHandler={this.onChangeHandler.bind(this)} submitBug={this.submitBug.bind(this)} file={this.state.file}/>}/>
        <Route path='/buglist' render={()=><BugList role={localStorage.role} editBug={this.editBug.bind(this)} deleteBug={this.deleteBug.bind(this)}/>}/>
        <Route path='/editbugstatus' render={()=><EditBugStatus bugname={this.inputs['bugname']} status={this.inputs['status']} takeInput={this.takeInput.bind(this)} editBugStatus={this.editBugStatus.bind(this)}/>}/>
        </Switch>
        </div>
    )
}
}
export default withRouter(Main);