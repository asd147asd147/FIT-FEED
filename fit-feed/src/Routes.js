import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Routers = () => (
  <Router>
    <Route exact path='/' component={Home} />
    <Route path='/login' component={SignIn} />
    <Route path='/signup' component={SignUp} />
  </Router>
)
export default Routers;