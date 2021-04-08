import React, {Component} from 'react';
import Sidebar from './Sidebar.js';
import './App.css';
import './Box.css';
import {Row, Col, Container, Card, Navbar, Nav, Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Design from "react-icons/bs";
import { IconContext } from 'react-icons';
import firebase from "./utils/firebaseapp";
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from './auth.js';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


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
async function alter(){
let datalist = [];
let count = 0; 
await firebase.database().ref('users').once('value').then(function(snapshot){
  snapshot.forEach(function(snapshot1){
    var u = snapshot1.key;
    var n = snapshot1.val().name;
    var em = snapshot1.val().mail;
    snapshot1.forEach(function(childSnapshot){
      childSnapshot.forEach(function(childSnapshot1){
        var comp_key = childSnapshot1.key;
        
        datalist[count] = {"user_name":n,'user_email' : em,"user_key":u,"org_key":comp_key,"org_name":childSnapshot1.val().orgdetails.name};
        count++;
      });
    });
  });
});
console.log(datalist);
return Promise.resolve(datalist);
}

class User_details extends Component{
 searchArray = [];
constructor(props) {
    super(props);
    this.state = {
      data:[],
    query: '',
      columnToQuery:'user_name',
    };
    this.get_data = this.get_data.bind(this); 
    this.handleChange = this.handleChange.bind(this);
    this.handleText = this.handleText.bind(this);
  }
 
 async get_data(){
var temp =  await alter();
console.log(temp);
 this.setState({
    data: temp, 
 });this.searchArray = temp;
}
handleChange(event){
  console.log(event.target.value);
  this.setState({
    columnToQuery: event.target.value 
  })
}
handleText(e){

let newArray = this.searchArray.filter((d)=>{
  console.log(d);
  var s = this.state.columnToQuery;
  console.log(s);
  var searchValue;
  if(s == 'user_name'){
  var searchValue = d.user_name.toLowerCase();
  }
  else if(s == 'org_name'){
  var searchValue = d.org_name.toLowerCase();

  }
  else if(s == 'user_email'){
  var searchValue = d.user_email.toLowerCase();

  }

  return searchValue.indexOf(e.target.value.toLowerCase()) !== -1;

});
this.setState({
  data: newArray,
  query: e.target.value,
})  

}


componentDidMount() {
this.get_data();
  
  
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
    <h2> User</h2>   
    <div className ="Searchbar">

  <TextField id="outlined" label="search" variant="outlined" className="textArea" value={this.state.query} onChange={this.handleText}  style={{paddingRight:"50px",width:"600px",height:"10px"}} />

    <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Select a column"
          value ={this.state.columnToQuery}
          style ={{textAlign:"Center",paddingLeft:"80px",paddingTop:"8px"}}
          onChange ={this.handleChange}
        >
          <MenuItem value="user_name">User Name</MenuItem>
          <MenuItem value="user_email">User Email</MenuItem>
          <MenuItem value="org_name">Organization Name</MenuItem>
        </Select>
      </div>

        <ReactTable
          data={this.state.data}
          columns={[
          
                {
                  Header: "Name of the User",
                  accessor: "user_name"
                },
                {
                  Header: "Email of the User",
                  accessor: "user_email"
                },
                {
                  Header: "Name of the Organization",
                  
                  accessor: "org_name"
                },
                {
                  Header: "View Files",
                  Cell: ({ cell }) => (
                    <Link to ='/Check_files'><Button >
                                  Click Here
                    </Button></Link>)
                }
    
          ]}
          defaultPageSize={5}
          style={{
            height: "400px",
            width: "1000px",
            margin : "20px",
            textAlign:"left"// This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-striped -highlight graph_px_box table "
          getTrProps={(state, rowInfo,column, instance) => {
            return {
              onClick: e =>{
                console.log(rowInfo.original);
                localStorage.setItem('user_name_check',JSON.stringify(rowInfo.original.user_name));
                localStorage.setItem('user_key_check',JSON.stringify(rowInfo.original.user_key));
                localStorage.setItem('org_key_check',JSON.stringify(rowInfo.original.org_key));
                localStorage.setItem('org_name_check',JSON.stringify(rowInfo.original.org_name));
  

              }
            }
          }}
          />
       
    </Col>
   </Row>
   </Container>
    </div>
  
  );
}
}

export default User_details;
