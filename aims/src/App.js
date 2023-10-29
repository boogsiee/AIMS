import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import Records from './Pages/Records';
import Profile from './Pages/Profile';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/sign" component={SignUp} />
          <Route path="/home" component={Home} />
          <Route path="/records" components={Records}/>
          <Route path="/profile" components={Profile}/>
          <Route path="/dashboard" components={Dashboard}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
