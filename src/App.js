import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Records from "./Pages/Records";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import Search from "./Pages/Search";
import RecordLists from "./Pages/RecordLists";
import Terminal from "./Pages/Terminals";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/sign" component={SignUp} />
          <Route path="/home" component={Home} />
          <Route path="/records" component={Records} />
          <Route path="/profile" component={Profile} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/search" component={Search} />
          <Route expath="/batch" component={RecordLists} />
          <Route path="/terminal" component={Terminal} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
