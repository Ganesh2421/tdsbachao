import './App.css';
import React , {Component , useState} from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {Link, BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import axios from 'axios';
import {Row, Col, Container, Card, Navbar, Nav, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Box.css";
import Line from 'react-chartjs-2';
import Chart from "chart.js";

const renderCard = (card, index) =>{
	console.log(index);
	return (
	<Card style = {{width : "12rem"}} key ={index} className = "main_pg_box">
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

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }
  componentDidUpdate() {
  	console.log(this.props.data);
    this.myChart.data.labels = this.props.data.map(d => d.TimeAndDate);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.waterlevel);
    this.myChart.update();
  }

  componentDidMount() {
    console.log(this.props.data);
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'line',
    options : {
      maintainAspectRatio: false,

      title:{
              display:this.props.displayTitle,
              text:this.props.main,
              fontSize:25
            }, 
       scales: {
          xAxes: [
            {

              type: 'time',
              time: {
                unit: this.props.seg
              },
              intervalType: this.props.seg,
              interval: 2,

              scaleLabel: {
                display: true,
                labelString: 'Time'
              }
                          }
          ],
          yAxes:[
          {scaleLabel: {
                display: true,
                labelString: 'Water-level in mm'
              }


          }]},
            legend:{
              display: 'waterlevel',
              position:'bottom'
            }
          },
        data: {labels:this.props.data.map(d => d.TimeAndDate),
        datasets:[
          {
            label:'Water Level',
            backgroundColor: 'rgba(75,192,192,1)',
            fill: false,
            data: this.props.data.map(d => d.waterlevel)
          }
        ]}
   });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

 
class App extends Component {
	constructor(props) {
    super(props);
    this.hrs_sec = React.createRef();
    this.week_sec = React.createRef();
    this.state = {
      data_curr: [],
      data_hrs: [],
      data_week:[],
      load_curr: false,
      load_hrs: false,
      load_week: false,
      weather_fore: [],
      weather_curr: [],
      card_info : [
	{ title:"2048", text :"Total Order"},
	{ title:"22", text :"Pending Order"},
	{ title:"3", text :"OnProcess Order"},
	{ title:"2022", text :"Completed Order"},
	],
    };
  }
	 
	
    componentDidMount(){
      axios.get('https://sensoryt.herokuapp.com/api/data/past/7-day')
        .then(res => 
        {this.setState({
        data_week: res.data,
        load_week:true

      });})
         	console.log(this.state.data_week);


    }
 render(){
  if(this.state.load_week){
  return (

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
  		<p class = "nav_items" style={{ textAlign: "left", paddingLeft:"25px", borderBottom:"1px solid #2d2d2d"}}> Page 1 </p>
  		<p class = "nav_items" style={{ textAlign: "left", paddingLeft:"25px", borderBottom:"1px solid #2d2d2d"}}> Page 2 </p>
  		<p class = "nav_items" style={{ textAlign: "left", paddingLeft:"25px", borderBottom:"1px solid #2d2d2d"}}> Page 3 </p>
  		
  	</Col>
  	<Col fluid style = {{textAlign:"left", paddingLeft:"20px", paddingRight:"0"}} xs = {3} md = {10}>
  		<p>Dashboard</p>
  		<div className = "graph_pg_box">
  				
		<LineChart data = {this.state.data_week.data} seg = 'day' main="Water-level(day)"/>  
  		
  	</div>
  		<div className = "grid"> {this.state.card_info.map(renderCard)}</div>
  		
	
	</Col>
  	</Row>
  	

  	</Container>
  	</>
  	  );
}
else{
	return(
      <>
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>
      <h3 style={{ textAlign: "center" }}>Content will get loaded in few seconds...</h3>
      </>);
}
}
}
export default App;
