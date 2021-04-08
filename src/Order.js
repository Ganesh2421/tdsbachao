import React , {Component , useState} from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {Link, BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import axios from 'axios';
import {Row, Col, Container, Card, Navbar, Nav, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Box.css";
import App from "./App.js";
import Menu from "./Menu.js";

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
        <Button variant="primary">Lock</Button>
        </Card.Body>
    </Card>
    ) 
  }
  
 
class Order extends Component {
	constructor(props) {
    super(props);
    this.week_sec = React.createRef();
    this.state = {
      data_week:[],
      load_week: false,
      card_info : [
  { title:"Order No 1", text :"First Order"},
  { title:"Order No 2", text :"Second Order"},
  { title:"Order No 3", text :"Third Order"},
  { title:"Order No 4", text :"Fouth Order"},
  ],
    };
  }
  render(){
	return (
    <Router>
    <Route path = "/Order" exact strict render = {
      () =>{
        return(
      <>
        <Container fluid style ={{paddingLeft:"0", paddingRight:"0"}} >
    <Row>
    <Col  style = {{textAlign:"center", backgroundColor:"black", paddingLeft:"0", paddingRight:"0"}} xs = {2} md = {2}>
      <p class = "nav_head" style={{ textAlign: "center",borderBottom:"1px solid #2d2d2d"}}> CANTEEN MANAGEMENT </p>
      
    </Col>
    <Col  style = {{textAlign:"center", paddingLeft:"0", paddingRight:"0"}} xs = {8} md = {6}>
    <Navbar bg = "light" expand = "lg" style = {{width:"100vw", borderBottom:"1px solid #2d2d2d"}}>
    <Navbar.Toggle aria-controls = "basic-navbar-nav" />
    <Navbar.Collapse id ="basic-navbar-nav">
    <Nav>

    <input placeholder = "Search" icon = "search" style = {{width:"60vw"}} />
    </Nav>
    </Navbar.Collapse>
    </Navbar>
    
    
    
    </Col>
    </Row>
    <Row>
    <Col  style = {{textAlign:"center", backgroundColor:"black", paddingLeft:"0", paddingRight:"0", height:"100vh"}} xs = {2} md = {2}>
      <p class = "nav_items" style={{ textAlign: "left", paddingLeft:"25px", borderBottom:"1px solid #2d2d2d"}}><Link to ="/"> Home </Link></p>
      <p class = "nav_items" style={{ textAlign: "left", paddingLeft:"25px", borderBottom:"1px solid #2d2d2d"}}><Link to ="/Menu"> Menu Page </Link></p>
      <p class = "nav_items" style={{ textAlign: "left", paddingLeft:"25px", borderBottom:"1px solid #2d2d2d"}}> Page 3 </p>
      
    </Col>
    <Col fluid style = {{textAlign:"left", paddingLeft:"20px", paddingRight:"0"}} xs = {10} md = {10}>
    <p style = {{textAlign:"Center"}}> Order Page </p>

      <div className = "grid"> {this.state.card_info.map(renderCard)}</div>
      
    </Col>


    </Row>

    </Container>
    </>
        );
      }
    }/>
    <Route path ="/" exact strict component = {App}/>
    <Route path ="/Menu" exact strict component = {Menu}/>
    </Router>
  	
  	  );
}
}
export default Order;
