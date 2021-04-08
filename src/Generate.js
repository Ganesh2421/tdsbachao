
import Sidebar from './Sidebar.js';
import {Row, Col, Container, Card, Navbar, Nav, Button, Modal,Dropdown,DropdownButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Design from "react-icons/bs";
import { IconContext } from 'react-icons';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from './auth.js';
import './Box.css';
import firebase from "./utils/firebaseapp";
import axios from "axios";
import ReactDOM from "react-dom";
import './index_reg.css';
import React, {Component, useRef ,useState} from 'react';
import "./App.css";
import file_symbol from './file_symbol.png';
import useApp from './useApp.js';
const getReadableSizeFromBytes = (bytes) => {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let l = 0
  let n = parseInt(bytes, 10) || 0
  while (n >= 1024 && ++l) n /= 1024
  // include a decimal point and a tenths-place digit if presenting
  // less than ten of KB or greater units
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]
}
const Input = (props) => (
  <input
    type="file"
    className ='file'
    name="img-loader-input"
    multiple
    
    {...props}
  />
)

const Displayi = ({ children }) => {
  const {
    files,
    pending,
    next,
    uploading,
    uploaded,
    status,
    onSubmit,
    onChange,
    
  } = useApp()
const OnUploadSubmission = e => {
    localStorage.setItem('Count',JSON.stringify('first'));

   const promises = [];
   files.forEach(file => {
    console.log(file.file);
    const uploadTask = 
     firebase.storage().ref().child('/users/'+JSON.parse(localStorage.getItem('user_key_report'))+'/orgs/'+JSON.parse(localStorage.getItem('org_key_report'))+'/Reports/'+JSON.parse(localStorage.getItem('Time'))+'/'+file.file.name).put(file.file);
       promises.push(uploadTask);
       uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
           const progress = 
             ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              if (snapshot.state === firebase.storage.TaskState.RUNNING) {
               console.log(`Progress: ${progress}%`);
              }
            },
            error => console.log(error.code),
            async () => {
              const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
               // do something with the url
             }
            );
            var temp_file_name =   file.file.name;
            console.log(temp_file_name);
  temp_file_name = String(temp_file_name.split('.')[0]);
            var time = new Date();
            var dd = ("0" + String(time.getDate())).slice(-2);
            var mm = ("0" + String(time.getMonth()+1)).slice(-2);
            var yyyy = ("0" + String(time.getFullYear())).slice(-2);
            var hrs = ("0" + String(time.getHours())).slice(-2);
            var min = ("0" + String(time.getMinutes())).slice(-2);
            var sec = ("0" + String(time.getSeconds())).slice(-2);
            
            try{
              console.log("innnn");
              var rootref = firebase.database().ref('users').child(JSON.parse(localStorage.getItem('user_key_report'))).child("orgs").child(JSON.parse(localStorage.getItem('org_key_report'))).child('Reports').child(JSON.parse(localStorage.getItem('Time')));
              rootref.child(temp_file_name).set(file.file.name);
              rootref.child('at').set(dd+'-'+mm+'-'+yyyy+'-'+hrs+'-'+min+'-'+sec);

            }
            catch(err){
              console.log(err);
            }
          });
      Promise.all(promises)
       .then()
       .catch(err => console.log(err.code));
}
  return (
      <>
      <div style={{textAlign:'center'}}>
        <Input onChange={onChange} />

      </div>

      <Button className='doc_details' type="submit" onClick={() => { OnUploadSubmission(); onChange();}}>Submit</Button>
      <Button className='doc_details' type="submit" onClick={onChange}>Reset Files</Button>
      <div >
        {files.map(({ file, src, id }, index) => (
          <div className = 'fileArea' key={`file-row${index}`}>
            <img src={file_symbol} alt="" style={{width:"100px",height:"100px"}}/>

            <div>{file.name}</div>
          </div>
        ))}
      </div>
   
   </>
    
  )
}




function Logout(){
  const { logout }  = useAuth();
      const history = useHistory();

    
async function logout_click(){
    try {
      console.log("Logout");

       logout();
      history.push("/");
    } catch(error){
      window.alert(error);
    }
  }
return(
  <Design.BsPeopleCircle style={{height:"27px", width:"100px",pointerEvents:"all"}} onClick ={()=>logout_click()}/>

  );

    
  
}
var files_uploaded = [];
var count = 0; 


function Display(){
    const [files, setfiles] = useState([]);

    
const onUploadSubmission = e => {
 e.preventDefault(); // prevent page refreshing
   const promises = [];
   files_uploaded.forEach(file => {
    console.log(file);
    const uploadTask = 
     firebase.storage().ref().child('/users/'+JSON.parse(localStorage.getItem('user_key_report'))+'/orgs/'+JSON.parse(localStorage.getItem('org_key_report'))+'/Reports/'+JSON.parse(localStorage.getItem('Time'))+'/'+file.name).put(file);
       promises.push(uploadTask);
       uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
           const progress = 
             ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              if (snapshot.state === firebase.storage.TaskState.RUNNING) {
               console.log(`Progress: ${progress}%`);
              }
            },
            error => console.log(error.code),
            async () => {
              const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
               // do something with the url
             }
            );
            var temp_file_name =   file.name;
  temp_file_name = String(temp_file_name.split('.')[0]);
            var time = new Date();
            var dd = ("0" + String(time.getDate())).slice(-2);
            var mm = ("0" + String(time.getMonth()+1)).slice(-2);
            var yyyy = ("0" + String(time.getFullYear())).slice(-2);
            var hrs = ("0" + String(time.getHours())).slice(-2);
            var min = ("0" + String(time.getMinutes())).slice(-2);
            var sec = ("0" + String(time.getSeconds())).slice(-2);
            
            try{
              console.log("innnn");
              var rootref = firebase.database().ref('users').child(JSON.parse(localStorage.getItem('user_key_report'))).child("orgs").child(JSON.parse(localStorage.getItem('org_key_report'))).child('Reports').child(JSON.parse(localStorage.getItem('Time')));
              rootref.child(temp_file_name).set(file.name);
              rootref.child('at').set(dd+'-'+mm+'-'+yyyy+'-'+hrs+'-'+min+'-'+sec);

            }
            catch(err){
              console.log(err);
            }
          });
      Promise.all(promises)
       .then(() => alert('All files uploaded'))
       .catch(err => console.log(err.code));
}
    

   function onFileChange(e){

 for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      
      newFile["id"] = Math.random();
      files_uploaded.push(newFile);
      console.log(count);
      console.log(files_uploaded[count]);
   
 

      count++;

    }
     
   
  };



 
  return (
    <div >
    <label>Select Files to Upload</label><input type="file" className="input_box" multiple onChange={onFileChange} />
        <Button className="doc_details" variant="primary" onClick={onUploadSubmission}  > Upload Files</Button>

     </div>
     );

  
  
  
}



const download = () => {
	var f = JSON.parse(localStorage.getItem('path_file'));
	
	var storeref =firebase.storage().ref(f);
	storeref.getDownloadURL()
	.then((url) => {
		var l = document.createElement("a");
		if(l.download !== undefined){
			l.setAttribute("href", url);
			l.setAttribute("target", "_blank");
			l.style.visibility = "hidden";
			document.body.appendChild(l);
			l.click();
			document.body.removeChild(l);
		}
	})
	.catch((error) => {
		throw(error);
	});}
class Generate extends Component {
	constructor(props) {
    super(props);
    this.state = {
      user_name : "",
      company_name : "",
      months_detail : [],
      label :"",
    };
    this.valuefetch = this.valuefetch.bind(this);
  }
  valuefetch(e){
  
    console.log(e);
      localStorage.setItem('Time',JSON.stringify(e));

    this.setState({
      label:e
    })
  }
componentDidMount(){
  	var j = 0;
    var datalist = [];
    var d = new Date();
    var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    var temp_year = d.getFullYear()-1;
    d.setFullYear(temp_year);
  localStorage.setItem('Count',JSON.stringify('first'));

    while(j<14){
      console.log(d.getMonth());
      var temp_month = d.getMonth() + j;
      if(temp_month <= 12){
      var temp_year = d.getFullYear();
      var temp_date = new Date(temp_year, temp_month);  
      datalist[j] = {"id":j+1,"value":months[temp_date.getMonth()]+'-'+temp_date.getFullYear()};}
      else{
        var temp_year = d.getFullYear() + 1;
        var temp_month = temp_month % 12;
        var temp_date = new Date(temp_year, temp_month);  
      datalist[j] = {"id":j+1,"value":months[temp_date.getMonth()]+'-'+temp_date.getFullYear()};
      }
      j++;
    }
    console.log(datalist);
  	this.setState({
  		user_name: JSON.parse(localStorage.getItem('user_name_report')),
  		company_name : JSON.parse(localStorage.getItem('org_name_report')),
  		months_detail : datalist,
      label: datalist[12].value,
  	})
  }
render(){
  return (
    <div className='home' >
    <Container fluid="true">
    <Row>
	<Col fluid = {true} style = {{textAlign:"center", paddingLeft:"0", paddingRight:"0"}} xs = {1} md = {2}>    
	<Sidebar />
    </Col>
	<Col  fluid = {true} style = {{paddingLeft:"5px", paddingRight:"0",paddingTop:"0"}}>      
	<Navbar bg = "light" className = "nav_pg_box" expand = "lg">
    <Navbar.Toggle aria-controls = "basic-navbar-nav" />
    <Navbar.Collapse id ="basic-navbar-nav">
    <Nav  style={{ flex: 1 , flexDirection:'row-reverse'}}>
    
<Logout />    
    </Nav>
    </Navbar.Collapse>
    </Navbar>
    <h2 style={{textAlign:'Center'}}> User Details</h2>   
    <div className= "detail_box text-center">
    <Row>
    <Col xs = {4} md = {6} style={{ textAlign:"Right"}}>
    <p>Name of the User: </p>
    </Col>
    <Col xs = {4} md = {5} style={{ textAlign:"Left"}}>
    <p>{this.state.user_name}</p>
    </Col>
   </Row> 
    <Row>
    <Col xs = {4} md = {6} style={{ textAlign:"Right"}}>
    <p>Name of the Company: </p>
    </Col>
    <Col xs = {4} md = {5} style={{ textAlign:"Left"}}>
    <p>{this.state.company_name}</p>
    </Col>
   </Row> 
   <Row>
    <Col xs = {4} md = {6} style={{ textAlign:"Right"}}>
    <p>Select Month:</p>
    </Col>
    <Col xs = {4} md = {5} style={{ textAlign:"Left"}}>
    <DropdownButton
      className ="doc_details_drag"
      title = {this.state.label}
      id = "dropdown menu"
      onSelect = {this.valuefetch}>
      {this.state.months_detail.map(item => (
      <Dropdown.Item eventKey ={item.value} >{item.value}</Dropdown.Item>))}
      </DropdownButton>
  </Col>
   </Row> 
           <Displayi/>    

 	</div>
    </Col>
   </Row>
   </Container>
   
    </div>
  );
}
}
export default Generate;