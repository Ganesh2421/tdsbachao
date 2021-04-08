/*
* Project Name:  Flood Montioring, Alerting and Prevention System
* Author List:  Ronak Upasham
* Filename:  register.js
* Functions:  post_data(event), Modal({show, close_modal}), Display()
* Global Variables:  None
*     
*/
import axios from "axios";
import ReactDOM from "react-dom";
import './index_reg.css';
import React, {Component, useRef ,useState} from 'react';
import "./App.css";


/*
*
* Function Name:   post_data()
* Input:   None
* Output:  None
* Logic:   Data is collected from the modal(from user) is posted to the Nodejs Serverwhere it is stored in MongoDb.
* Example Call:   post_data() 
*
*/
function post_data(event){
    var name = document.forms["RegForm"]["name"];
      var phonenumber = document.forms["RegForm"]["num"];
  const xhr = new XMLHttpRequest();

  axios({
      method: 'post',
      url: 'https://myappyt.herokuapp.com/api/data/auth/register',
      data: {
        username: name.value, 
        phoneNumber: phonenumber.value
      },
      validateStatus: (status) => {
        return true; 
      },
    }).catch(error => {
      console.log(error);

    }).then(response => {
        // this is now called!
        console.log("Suceesfully Done");
    });
};
/*
*
* Function Name:   Modal()
* Input:   None
* Output:  None
* Logic:   A Modal is poped-up where the usr can register for flood alertion. 
* Example Call:   Modal()
*
*/
const Modal =({show,close_modal}) =>{
  console.log(show);
  return(
        <div  class="modal" id = "id02" style={{
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0'
      }}>
        

        <form class="modal-content" id="RegForm1" name="RegForm" onSubmit={close_modal} >
            <div class="imgcontainer">
                <p  >Register Yourself</p>
                <span onClick={close_modal} class="close" title="Close Modal">×</span>

                
            </div>
            <div class="container">
                <label><b>Name </b></label>
                <input type="text" placeholder="Enter Name" name="name" required />

                <label><b>Mobile No.</b></label>
                <input type="phonenumber" placeholder="Enter Number" name="num" required />

                
                

                <div class="clearfix">
                    <button  class="signupbtn" value="submit" type="submit" onClick = {post_data}>Sign Up</button>
                </div>
            </div>
        </form>
    </div>
    )
};



function Display(){
  const [show, setShow] = useState(false);

  const closeModalHandler = (event) => {
    event.preventDefault();
    setShow(false);};
  

    return(
      <>
        <p class = 'link' style = {{textAlign: "center"}} onClick={() => setShow(true)}>Click here to Register</p>
      <Modal show={show} close_modal={closeModalHandler} />
      </>       );

  
  
  
}

export default Display;
