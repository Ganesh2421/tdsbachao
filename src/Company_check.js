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
async function keyload(){
let datalist = [];

var rootref = firebase.database().ref('pending');
await rootref.once("value", snapshot =>{
  snapshot.forEach(snap=>{
        datalist.push(snap.val());

       
});

  
  });
 
 console.log(datalist);
 var i = 0;
 
 var data = [];
 var count = 0;
 
 while (i<datalist.length){
   var temp = datalist[i].split("/");
  console.log(temp);
  if(temp[3] == JSON.parse(localStorage.getItem('org_key'))){
    if(temp[4] == 'Purchases')
    {
    data[count] ={"key":temp[1],"org_key":temp[3],"FT":temp[4],"vendor":temp[5],"FY": "--","File_name":temp[6],'path':datalist[i]};
    }
    else if( temp[4] == "Sales")
    {
    data[count] ={"key":temp[1],"org_key":temp[3],"FT":temp[4],"FY":temp[5],"vendor": "--","File_name":temp[6],'path':datalist[i]};

    }
    count++;
  }

  i++;
 }
 /*var j  = 0;

 while(j<count){
  var rootref = firebase.database().ref('user').child(data[j].key);
  await rootref.once("value", snapshot =>{
    temp_nm = snapshot.val().name;
    //final_data[j] = {'name':snapshot.val().name, "key":data[j].key,"org_key":data[j].org_key};
  });
   var rootref = firebase.database().ref('user').child(data[j].key).child("orgs").child(data[j].org_key).child('orgdetails');
  await rootref.once("value", snapshot =>{
    temp_org = snapshot.val().name;
    //final_data[j] = {'name':snapshot.val().name, "key":data[j].key,"org_key":data[j].org_key};
  });
  final_data[j] = {'name':temp_nm, "key":data[j].key,"org_key":data[j].org_key,'org_name':temp_org, 'totalcount': dict[data[j].org_key]};
  j++;
 }*/
 console.log(data);
 return Promise.resolve(data);
  
}

const rendertable = (drivers, index) => {
  console.log(index);
  const File_Details = () => {
  
  localStorage.setItem('FT',JSON.stringify(drivers.FT));
  localStorage.setItem('Vendors',JSON.stringify(drivers.vendor));
  localStorage.setItem('File_name',JSON.stringify(drivers.File_name));
  localStorage.setItem('path_file',JSON.stringify(drivers.path));
}
    return(
    <tr key = {index}>
      
      <td>{drivers.File_name}</td>
      <td>{drivers.FT}</td>
      <td><Link to ="/status">< Button variant="primary" onClick = {File_Details}>Click</Button></Link></td>
    </tr>
      );
    }

class Company_Check extends Component{
searchArray = [];
constructor(props) {
    super(props);
    this.state = {
      data:[],
      query: '',
      columnToQuery:'File_Name',
    };
    this.get_data = this.get_data.bind(this); 
    this.handleChange = this.handleChange.bind(this);
    this.handleText = this.handleText.bind(this);
  }
 async get_data(){
var temp =  await keyload();
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
  if(s == 'File_Name'){
  var searchValue = d.File_name.toLowerCase();
  }
  else if(s == 'FT'){
  var searchValue = d.FT.toLowerCase();

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
    <h3>{JSON.parse(localStorage.getItem('user_name'))}->{JSON.parse(localStorage.getItem('org_name'))}</h3> 

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
          <MenuItem value="FT">File Type</MenuItem>
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
                  
                  accessor: "FT"
                },
                {
                  Header: "Vendor",
                  
                  accessor: "vendor"
                },
                {
                  Header: "Financial Year",
                  
                  accessor: "FY"
                },
                {
                  Header: "File Details",
                  Cell: ({ cell }) => (
                    <Link to ='/status'><Button >
                                  Click Here
                    </Button></Link>)
                }
    
          ]}
          defaultPageSize={5}
          style={{
            height: "400px",
            width: "950px",
            margin : "20px",
            textAlign:"left"// This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-striped -highlight graph_px_box table "
          getTrProps={(state, rowInfo,column, instance) => {
            return {
              onClick: e =>{
                console.log(rowInfo.original);
                localStorage.setItem('FT',JSON.stringify(rowInfo.original.FT));
                localStorage.setItem('FY',JSON.stringify(rowInfo.original.FY));

                localStorage.setItem('Vendors',JSON.stringify(rowInfo.original.vendor));
                localStorage.setItem('File_name',JSON.stringify(rowInfo.original.File_name));
                localStorage.setItem('path_file',JSON.stringify(rowInfo.original.path));
  

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

export default Company_Check;
