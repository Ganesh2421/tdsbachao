import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home.js';
import Reports from './Reports.js';
import Products from './Products.js';
import Status from './Status.js';
import Register from './register_page.js';
import Company_Check from'./Company_check.js';
import Generate from './Generate.js';
import Login from './login.js';
import Check_files from './Check_files.js';
import { AuthProvider } from "./auth.js";
import User_details from './User_details.js';
import status_file from './status_file.js';
function App() {
  return (
    <>
      <Router>
      <AuthProvider>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/home' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/pending_files' component={Products} />
          <Route path='/Company_check' component={Company_Check} />
          <Route path='/status' component={Status} />
          <Route path='/generate_reports' component={Generate} />
          <Route path='/User_details' component={User_details} />
          <Route path='/Check_files' component={Check_files} />
          <Route path='/status_file' component={status_file} />
          <Route path='/register_page' component={Register} />

        </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
