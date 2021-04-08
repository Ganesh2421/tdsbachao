
import Sidebar from './Sidebar.js';
import {Row, Col, Container, Card, Navbar, Nav, Button} from 'react-bootstrap';
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



async function accept_confirm(){
 var temp_file_name =   JSON.parse(localStorage.getItem('File_name'));
  temp_file_name = String(temp_file_name.split('.')[0]);
var time = new Date();
            var dd = ("0" + String(time.getDate())).slice(-2);
            var mm = ("0" + String(time.getMonth()+1)).slice(-2);
            var yyyy = ("0" + String(time.getFullYear())).slice(-2);
            var hrs = ("0" + String(time.getHours())).slice(-2);
            var min = ("0" + String(time.getMinutes())).slice(-2);
            var sec = ("0" + String(time.getSeconds())).slice(-2);
            

if(JSON.parse(localStorage.getItem('FT')) == "Sales"){
var rootref = firebase.database().ref('users').child(JSON.parse(localStorage.getItem('user_key'))).child("orgs").child(JSON.parse(localStorage.getItem('org_key'))).child(JSON.parse(localStorage.getItem('FT'))).child(JSON.parse(localStorage.getItem('FY'))).child(temp_file_name).child('details').child('status');
await rootref.set('Accepted');
var rootref = firebase.database().ref('users').child(JSON.parse(localStorage.getItem('user_key'))).child("orgs").child(JSON.parse(localStorage.getItem('org_key'))).child(JSON.parse(localStorage.getItem('FT'))).child(JSON.parse(localStorage.getItem('FY'))).child(temp_file_name).child('details');
await rootref.child('ET').set(dd+'-'+mm+'-'+yyyy+'-'+hrs+'-'+min+'-'+sec);
}
else if(JSON.parse(localStorage.getItem('FT')) == "Purchases"){
var rootref = firebase.database().ref('users').child(JSON.parse(localStorage.getItem('user_key'))).child("orgs").child(JSON.parse(localStorage.getItem('org_key'))).child(JSON.parse(localStorage.getItem('FT'))).child(JSON.parse(localStorage.getItem('Vendors'))).child(temp_file_name).child('details').child('status');
await rootref.set('Accepted');
var rootref = firebase.database().ref('users').child(JSON.parse(localStorage.getItem('user_key'))).child("orgs").child(JSON.parse(localStorage.getItem('org_key'))).child(JSON.parse(localStorage.getItem('FT'))).child(JSON.parse(localStorage.getItem('Vendors'))).child(temp_file_name).child('details');
await rootref.child('ET').set(dd+'-'+mm+'-'+yyyy+'-'+hrs+'-'+min+'-'+sec);
}
await firebase.database().ref('pending').child(temp_file_name).set(null);
}
async function reject_confirm(){
 var temp_file_name =   JSON.parse(localStorage.getItem('File_name'));
  temp_file_name = String(temp_file_name.split('.')[0]);
var time = new Date();
            var dd = ("0" + String(time.getDate())).slice(-2);
            var mm = ("0" + String(time.getMonth()+1)).slice(-2);
            var yyyy = ("0" + String(time.getFullYear())).slice(-2);
            var hrs = ("0" + String(time.getHours())).slice(-2);
            var min = ("0" + String(time.getMinutes())).slice(-2);
            var sec = ("0" + String(time.getSeconds())).slice(-2);
            
console.log(JSON.parse(localStorage.getItem('FY')));
if(JSON.parse(localStorage.getItem('FT')) == "Sales"){
var rootref = firebase.database().ref('users').child(JSON.parse(localStorage.getItem('user_key'))).child("orgs").child(JSON.parse(localStorage.getItem('org_key'))).child(JSON.parse(localStorage.getItem('FT'))).child(JSON.parse(localStorage.getItem('FY'))).child(temp_file_name).child('details').child('status');
await rootref.set('Rejected');
var rootref = firebase.database().ref('users').child(JSON.parse(localStorage.getItem('user_key'))).child("orgs").child(JSON.parse(localStorage.getItem('org_key'))).child(JSON.parse(localStorage.getItem('FT'))).child(JSON.parse(localStorage.getItem('FY'))).child(temp_file_name).child('details');
await rootref.child('ET').set(dd+'-'+mm+'-'+yyyy+'-'+hrs+'-'+min+'-'+sec);
}
else if(JSON.parse(localStorage.getItem('FT')) == "Purchases"){
var rootref = firebase.database().ref('users').child(JSON.parse(localStorage.getItem('user_key'))).child("orgs").child(JSON.parse(localStorage.getItem('org_key'))).child(JSON.parse(localStorage.getItem('FT'))).child(JSON.parse(localStorage.getItem('Vendors'))).child(temp_file_name).child('details').child('status');
await rootref.set('Rejected');
var rootref = firebase.database().ref('users').child(JSON.parse(localStorage.getItem('user_key'))).child("orgs").child(JSON.parse(localStorage.getItem('org_key'))).child(JSON.parse(localStorage.getItem('FT'))).child(JSON.parse(localStorage.getItem('Vendors'))).child(temp_file_name).child('details');
await rootref.child('ET').set(dd+'-'+mm+'-'+yyyy+'-'+hrs+'-'+min+'-'+sec);
}
await firebase.database().ref('pending').child(temp_file_name).set(null);


}
const Modal2 =({show_reject,close_modal}) =>{
  console.log(show_reject);
  return(
        <div  class="modal" id = "id02" style={{
        transform: show_reject ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show_reject ? '1' : '0'
      }}>
        

        <form class="modal-content" id="RegForm1" name="RegForm" onSubmit={close_modal} >
            <div class="imgcontainer">
                <p  >Confirmation</p>
                <span onClick={close_modal} class="close" title="Close Modal">×</span>

                
            </div>
            <div class="container">
                <p>Do you really want to reject this file</p>
                

                <div class="clearfix">
                    <Link to="/home"><button  class="signupbtn" value="submit" type="submit" onClick= {reject_confirm} >Reject</button></Link>
                </div>
            </div>
        </form>
    </div>
    )
};
const Modal1 =({show,close_modal}) =>{
  console.log(show);
  return(
        <div  class="modal" id = "id02" style={{
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0'
      }}>
        

        <form class="modal-content" id="RegForm1" name="RegForm" onSubmit={close_modal} >
            <div class="imgcontainer">
                <p  >Confirmation</p>
                <span onClick={close_modal} class="close" title="Close Modal">×</span>

                
            </div>
            <div class="container">
                <p>Do you really want to accept this file</p>
                

                <div class="clearfix">
                    <Link to="/home"><button  class="signupbtn" value="submit" type="submit" onClick= {accept_confirm} >Accept</button></Link>
                </div>
            </div>
        </form>
    </div>
    )
};


function Display(){
  const [show, setShow] = useState(false);
  const [show_reject, setShow_reject] = useState(false);
  const closeModalHandler = (event) => {
    event.preventDefault();
    setShow(false);};
  const closeModalHandlerReject = (event) => {
    event.preventDefault();
    setShow_reject(false);};

    return(
      <div className="doc_details" style={{textAlign:"Center"}}>
        <Button className="doc_details" variant="primary"  onClick = {download}> Download File</Button>
    <Button className="doc_details" variant="primary"  onClick={() => setShow(true)}> Accept</Button> 
    <Modal1 show={show} close_modal={closeModalHandler} />
    <Button className="doc_details" variant="primary" style={{itemAlign:"Center"}} onClick = {() => setShow_reject(true)}> Reject</Button>
    <Modal2 show_reject={show_reject} close_modal={closeModalHandlerReject} />

      </div>       );

  
  
  
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
    window.alert("File Not Present");
		throw(error);
	});}
class Status extends Component {
	constructor(props) {
    super(props);
    this.state = {
      user_name : "",
      company_name : "",
      Bill_type : "",
      file_name :"",
    };
    
  }
 
componentDidMount(){
  	
  	this.setState({
  		user_name: JSON.parse(localStorage.getItem('user_name')),
  		company_name : JSON.parse(localStorage.getItem('org_name')),
  		Bill_type : JSON.parse(localStorage.getItem('FT')),
  		file_name : JSON.parse(localStorage.getItem('File_name')),
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
    
<Logout/>    
    </Nav>
    </Navbar.Collapse>
    </Navbar>
    <h2 style={{textAlign:'Center'}}> Document Details</h2>   
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
    <p>Bill Type: </p>
    </Col>
    <Col xs = {4} md = {5} style={{ textAlign:"Left"}}>
    <p>{this.state.Bill_type}</p>
    </Col>
   </Row> 
   <Row>
    <Col xs = {4} md = {6} style={{ textAlign:"Right"}}>
    <p>Name of the File: </p>
    </Col>
    <Col xs = {4} md = {5} style={{ textAlign:"Left"}}>
    <p>{this.state.file_name}</p>
    </Col>
   </Row> 
    <Display />
 	</div>
    </Col>
   </Row>
   </Container>
    </div>
  );
}
}
export default Status;