import loginImg from "./login.png";
import './start.css';
import {Row, Col, Container, Card, Navbar, Nav, Button, Table, Form, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef, useState } from "react";
import { useAuth } from "./auth.js";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login }  = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      console.log('try' );
      console.log(login);

      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/home");
    } catch(error){
      setError("Failed to log in")
      window.alert(error);

    }

    setLoading(false);
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
        <div class="email" style={{backgroundColor: "white"}}><label style={{backgroundColor: "white"}}><b style={{backgroundColor: "white",size:"20px"}}>Email</b></label></div>
        <input type="text" placeholder="Enter Email" name="email" id ="email" ref = {emailRef} required/>

        <div class="password"style={{backgroundColor: "white"}}><label><b style={{backgroundColor: "white"}}>Password</b></label></div>
        <input type="password" placeholder="Enter Password" name="psw" id="psw" ref={passwordRef} required />

        <button  type="submit">Login</button>
      </div>

      <div class="container1" style={{backgroundColor: "white"}}>
                 <Link to="/register_page"><p style={{backgroundColor:"white", textAlign:"center"}}>New User?</p></Link>
            </div>
    </form>
    </div>
    </>
    );
  }

 
export default Login;
