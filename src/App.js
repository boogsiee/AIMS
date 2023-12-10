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
import EditProfile from "./Pages/EditProfile";
import Verification from "./Pages/Verification";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/sign" component={SignUp} />
          <Route path="/terminal" component={Terminal} />
          <Route path="/records" component={Records} />
          <Route path="/profile" component={Profile} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/search" component={Search} />
          <Route path="/batch" component={RecordLists} />
          <Route path="/home" component={Home} />
          <Route path="/edit" component={EditProfile} />
          <Route path="/verification" component={Verification} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
