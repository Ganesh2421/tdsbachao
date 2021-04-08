
import Sidebar from './Sidebar.js';
import {Row, Col, Container, Card, Navbar, Nav, Button, Modal} from 'react-bootstrap';
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


var rootref = firebase.database().ref('user').child(JSON.parse(localStorage.getItem('user_key'))).child("orgs").child(JSON.parse(localStorage.getItem('org_key'))).child(JSON.parse(localStorage.getItem('FT'))).child(JSON.parse(localStorage.getItem('Vendors'))).child(temp_file_name).child('details').child('status');
await rootref.set('Accepted');
await firebase.database().ref('Pending').child(temp_file_name).set(null);
window.alert("Accepted");
}
async function reject_confirm(){
 var temp_file_name =   JSON.parse(localStorage.getItem('File_name'));
  temp_file_name = String(temp_file_name.split('.')[0]);


var rootref = firebase.database().ref('user').child(JSON.parse(localStorage.getItem('user_key'))).child("orgs").child(JSON.parse(localStorage.getItem('org_key'))).child(JSON.parse(localStorage.getItem('FT'))).child(JSON.parse(localStorage.getItem('Vendors'))).child(temp_file_name).child('details').child('status');
await rootref.set('Rejected');
await firebase.database().ref('Pending').child(temp_file_name).set(null);
window.alert("Rejected");

}


function Display(){
    const [show, setShow] = useState(false);
   
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  return (
    <div style={{backgroundColor:"white"}}>
   
      <Button  variant="primary" onClick={handleShow}>
        Accepted
      </Button>
   
      <Modal size="lg" show={show} onHide={handleClose} onSubmit={accept_confirm}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation Pop-up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do You really want to accept the document.
           <Button variant="primary" type="submit" onClick={accept_confirm}>
            Confirm
          </Button>
        </Modal.Body>
        
      </Modal>
    </div>
 );

  
  
  
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
  var f ;
  if (JSON.parse(localStorage.getItem('FT_check')) == 'Sales'){
     f ='/users/'+JSON.parse(localStorage.getItem('user_key_check'))+'/orgs/'+JSON.parse(localStorage.getItem('org_key_check'))+'/'+JSON.parse(localStorage.getItem('FT_check'))+'/'+JSON.parse(localStorage.getItem('FY_check'))+'/'+JSON.parse(localStorage.getItem('File_name_check'));

  }
  else{
      f ='/users/'+JSON.parse(localStorage.getItem('user_key_check'))+'/orgs/'+JSON.parse(localStorage.getItem('org_key_check'))+'/'+JSON.parse(localStorage.getItem('FT_check'))+'/'+JSON.parse(localStorage.getItem('Vendors_check'))+'/'+JSON.parse(localStorage.getItem('File_name_check'));
 ;

  }
  console.log(f);
	
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
      window.alert('Download File');
		}
	})
	.catch((error) => {
    window.alert("File Not Present");
		throw(error);
	});}
class status_file extends Component {
	constructor(props) {
    super(props);
    this.state = {
      user_name : "",
      company_name : "",
      Bill_type : "",
      file_name :"",
      vendor:"",
      fy:"",
    };
    
  }
 
componentDidMount(){
  	
  	this.setState({
  		user_name: JSON.parse(localStorage.getItem('user_name_check')),
  		company_name : JSON.parse(localStorage.getItem('org_name_check')),
  		Bill_type : JSON.parse(localStorage.getItem('FT_check')),
  		file_name : JSON.parse(localStorage.getItem('File_name_check')),
      vendor : JSON.parse(localStorage.getItem('Vendors_check')),
      fy : JSON.parse(localStorage.getItem('FY_check')),
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
   <Row>
    <Col xs = {4} md = {6} style={{ textAlign:"Right"}}>
    <p>Vendor: </p>
    </Col>
    <Col xs = {4} md = {5} style={{ textAlign:"Left"}}>
    <p>{this.state.vendor}</p>
    </Col>
   </Row> 
   <Row>
    <Col xs = {4} md = {6} style={{ textAlign:"Right"}}>
    <p>Financial Year: </p>
    </Col>
    <Col xs = {4} md = {5} style={{ textAlign:"Left"}}>
    <p>{this.state.fy}</p>
    </Col>
   </Row> 
    <Button className="doc_details" variant="primary"  onClick = {download}> Download File</Button>

 	</div>
    </Col>
   </Row>
   </Container>
    </div>
  );
}
}
export default status_file;