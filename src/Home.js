import React from 'react';
import Sidebar from './Sidebar.js';
import {Row, Col, Container, Card, Navbar, Nav, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Design from "react-icons/bs";
import { IconContext } from 'react-icons';
import { useAuth } from "./auth.js";
import { Link, useHistory } from "react-router-dom";

import './Box.css';
const renderCard = (card, index) =>{
  console.log(index);
  return (
  <Card style = {{width : "12rem"}} key ={index} className = "box">
        <Card.Body>
        <Card.Title>
          {card.title}
        </Card.Title>
        <Card.Text>
          {card.text}
        </Card.Text>
        </Card.Body>
    </Card>
    ) 
  }
 const card_info = [
  { title:"Order No 1", text :"First Order"},
  { title:"Order No 2", text :"Second Order"},
  { title:"Order No 3", text :"Third Order"},
  { title:"Order No 4", text :"Fouth Order"},
  { title:"Order No 4", text :"Fouth Order"},
  ];

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
function Home() {

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
    <h2> Dashboard</h2>   
    <p> This Section is under-development!!!!</p>    
 
    </Col>
   </Row>
   </Container>
    </div>
  );
}

export default Home;