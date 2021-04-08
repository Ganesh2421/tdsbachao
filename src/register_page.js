import loginImg from "./login.png";
import './start.css';
import {Row, Col, Container, Card, Navbar, Nav, Button, Table, Form, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef, useState } from "react";
import { useAuth } from "./auth.js";
import { Link, useHistory } from "react-router-dom";

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const cnf_psw_Ref = useRef();
  const throwError = [];
  const { signup }  = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  function form_validation(){

      var reg = /^([\w-\.]+@(?!mdchoraria.com)([\w-]+\.)+[\w-]{2,4})?$/;
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      var flag = 0;
    
      if(!(emailRef.current.value.match(mailformat))) {
            setError("You have entered an invalid email address!");
                    console.log("invalid email");

            flag = 1;
            return('false');
      }
      if (reg.test(emailRef.current.value)){
        setError('Oops!! Access is not allowed');
        console.log("invalid access");
        flag = 1
        return('false');
      }
      if (cnf_psw_Ref.current.value != passwordRef.current.value){
        setError('Password and Confirm Password do not match');
                console.log("invalid password");

        flag = 1
        return ('false'); 
      }
      if(flag == 0){
        return ('true');
      }
      else{
        return ('false');
      }
      



  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(form_validation());
    if(form_validation() == 'true')
    {
    try {
      setError("");
      setLoading(true);
      console.log('try' );
      console.log(signup);

      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
      
    } catch(error){
      setError("Failed to log in")
      window.alert(error);
    }

    setLoading(false);
  }
}
    return (
      <>
      <div  class="modal" id="id01">

    <form class="modal-content animate" action=""  id = "Log" name="Logpage" onSubmit ={handleSubmit}>
                    {error && <Alert variant="danger">{error}</Alert>}

      <div class="imgcontainer">
      <img src ={loginImg} style={{height:"50px",width:"400px"}} />

        
      </div>

      <div class="container">
        <div className="email" style={{backgroundColor: "white"}}><label style={{backgroundColor: "white"}}><b style={{backgroundColor: "white",size:"20px"}}>Email</b></label></div>
        <input type="text" placeholder="Enter Email" name="email" id ="email" ref = {emailRef} required/>

        <div className="password"style={{backgroundColor: "white"}}><label><b style={{backgroundColor: "white"}}>Password</b></label></div>
        <input type="password" placeholder="Enter Password" name="psw" id="psw" ref = {passwordRef} required />

        <div className="password"style={{backgroundColor: "white"}}><label><b style={{backgroundColor: "white"}}>Confirm Password</b></label></div>
        <input type="password" placeholder="Enter Confirm Password" name="cnf_psw" id="cnf_psw" ref = {cnf_psw_Ref} required />

        <button value="submit" type="submit" >Register</button>
      </div>

      <div style={{backgroundColor: "white",textAlign:"Center",color:"darkblue"}}>
                 <Link to="/"><p style={{backgroundColor:"white"}}>Already User?</p></Link>
                
            </div>
    </form>
    </div>
    </>
    );
  }



export default Register;
