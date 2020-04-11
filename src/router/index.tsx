import React from 'react';
import { HashRouter as Router, Route, Switch , Redirect} from 'react-router-dom';
import asyncImport from '../utils/asyncImport';
import path from 'path';

import Home from '../pages/home';
import About from '../pages/about';
import Map from '../components/map';


export default () => {
  return <Router>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/map" component={Map}></Route>
      <Redirect from="/" to="/home"></Redirect>
    </Switch>
  </Router>
}
