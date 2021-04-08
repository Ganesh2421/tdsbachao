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
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

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
async function keyload(){
let datalist = [];

var rootref = firebase.database().ref('pending');
await rootref.once("value", snapshot =>{
 	snapshot.forEach(snap=>{
        datalist.push(snap.val());
        console.log(snap.val())

       
});

  
 	});
 
 console.log(datalist);
 var i = 0;
 var dict = {};
 var data = [];
 var final_data = [];
 var count = 0;
 var temp_nm, temp_org, temp_em;
 while (i<datalist.length){
   var temp = datalist[i].split("/");
  console.log(temp);
  if (temp[3] in dict){
    dict[temp[3]] = dict[temp[3]] + 1;
  }else{
    dict[temp[3]] = 1;
    data[count] ={"key":temp[1],"org_key":temp[3]};
    count++; 
  }
  i++;
 }
 var j  = 0;

 while(j<count){
  console.log(data[j]);
  var rootref = firebase.database().ref('users').child(data[j].key);
  await rootref.once("value", snapshot =>{
    console.log(snapshot.val())
    temp_nm = snapshot.val().name;
    temp_em = snapshot.val().mail;
    //final_data[j] = {'name':snapshot.val().name, "key":data[j].key,"org_key":data[j].org_key};
  });
   var rootref = firebase.database().ref('users').child(data[j].key).child("orgs").child(data[j].org_key).child('orgdetails');
  await rootref.once("value", snapshot =>{
    temp_org = snapshot.val().name;
    //final_data[j] = {'name':snapshot.val().name, "key":data[j].key,"org_key":data[j].org_key};
  });
  final_data[j] = {'user_name':temp_nm,'user_email':temp_em, "user_key":data[j].key,"org_key":data[j].org_key,'org_name':temp_org, 'totalcount': dict[data[j].org_key]};
  j++;
 }
 console.log(dict, final_data);
 return Promise.resolve(final_data);
  
}


class Products extends Component{
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
var temp = 	await keyload();
console.log(temp);
 this.setState({
  	data: temp, 
 });
this.searchArray = temp;
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
    <h3>Pending Files</h3>  
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
                  Header: "Files Pending",
                  
                  accessor: "totalcount"
                },
                {
                  Header: "View Files",
                  Cell: ({ cell }) => (
                    <Link to ='/Company_check'><Button >
                                  Click Here
                    </Button></Link>)
                }
    
          ]}
          defaultPageSize={5}
          style={{
            height: "400px",
            margin : "20px",
            width: '1000px',
            textAlign:"left"// This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-striped -highlight graph_px_box table "
          getTrProps={(state, rowInfo,column, instance) => {
            return {
              onClick: e =>{
                console.log(rowInfo.original);
                localStorage.setItem('user_name',JSON.stringify(rowInfo.original.user_name));
                localStorage.setItem('user_key',JSON.stringify(rowInfo.original.user_key));
                localStorage.setItem('org_key',JSON.stringify(rowInfo.original.org_key));
                localStorage.setItem('org_name',JSON.stringify(rowInfo.original.org_name));
  

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

export default Products;
