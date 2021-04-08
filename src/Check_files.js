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
async function dataload(){
let datalist = [];
let count = 0; 
    console.log(JSON.parse(localStorage.getItem('user_key_check')));

await firebase.database().ref('users/'+String(JSON.parse(localStorage.getItem('user_key_check')))+'/orgs/'+String(JSON.parse(localStorage.getItem('org_key_check')))+'/Purchases').on('value', function(snapshot){

snapshot.forEach(function(snapshot1){
  
    
      var u = snapshot1.key;

      snapshot1.forEach(function(childsnapshot){
        var v = childsnapshot.key
        
          datalist[count] = {'file_type':'Purchases', 'FY' : '--','vendor':u, 'File_name':childsnapshot.val().name, 'upload_time':childsnapshot.val().details.at, 'status':childsnapshot.val().details.status}
          count++;


        
      

      });
    });
});
await firebase.database().ref('users/'+String(JSON.parse(localStorage.getItem('user_key_check')))+'/orgs/'+String(JSON.parse(localStorage.getItem('org_key_check')))+'/Sales').on('value', function(snapshot){

snapshot.forEach(function(snapshot1){
  
    
      var u = snapshot1.key;

      snapshot1.forEach(function(childsnapshot){
        var v = childsnapshot.key
        
          datalist[count] = {'file_type':'Sales', 'FY' : u,'vendor':"--", 'File_name':childsnapshot.val().name, 'upload_time':childsnapshot.val().details.at, 'status':childsnapshot.val().details.status}
          count++;


        
      

      });
    });
});

console.log(datalist);
return Promise.resolve(datalist);
  
}


class Check_files extends Component{
 searchArray = [];
constructor(props) {
    super(props);
    this.state = {
      data:[],
      load:false,
   query: '',
      columnToQuery:'File_Name',
    };
    this.get_data = this.get_data.bind(this); 
    this.handleChange = this.handleChange.bind(this);
    this.handleText = this.handleText.bind(this);
  }
 async get_data(){
var temp =  await dataload();
console.log(temp);
 this.setState({
    data: temp,
    load: true, 
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
  console.log(d.File_name);
  var searchValue;
  if(s == 'File_Name'){
  var searchValue = d.File_name.toLowerCase();
  }
  else if(s == 'file_type'){
  var searchValue = d.file_type.toLowerCase();

  }
  else if(s == 'vendor'){
  var searchValue = d.vendor.toLowerCase();

  }
  else if(s == 'FY'){
  var searchValue = d.FY.toLowerCase();

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
    console.log('print')
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
    <h3>{JSON.parse(localStorage.getItem('user_name_check'))}->{JSON.parse(localStorage.getItem('org_name_check'))}</h3>
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
          <MenuItem value="File_Name">File Name</MenuItem>
          <MenuItem value="file_type">File Type</MenuItem>
          <MenuItem value="vendor">Vendor</MenuItem>
          <MenuItem value="FY">Financial Year</MenuItem>
        </Select>
  </div>
   
<ReactTable
          data={this.state.data}
          columns={[
          
                {
                  Header: "Name of the File",
                  accessor: "File_name"
                },
                {
                  Header: "File Type",
                  
                  accessor: "file_type"
                },
                {
                  Header: "Vendor",
                  
                  accessor: "vendor"
                },
                {
                  Header: "Financial Year",
                  accessor:"FY"
                },
                {
                  Header: "Upload Time",
                  accessor:"upload_time"
                },
                {
                  Header: "File Details",
                  Cell: ({ cell }) => (
                    <Link to ='/status_file'><Button >
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
                localStorage.setItem('FT_check',JSON.stringify(rowInfo.original.file_type));
                localStorage.setItem('Vendors_check',JSON.stringify(rowInfo.original.vendor));
                localStorage.setItem('File_name_check',JSON.stringify(rowInfo.original.File_name));
                localStorage.setItem('AT_check',JSON.stringify(rowInfo.original.upload_time));
                localStorage.setItem('status_check',JSON.stringify(rowInfo.original.status));
                localStorage.setItem('FY_check',JSON.stringify(rowInfo.original.FY));



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

export default Check_files;
