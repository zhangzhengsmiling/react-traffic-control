import React from 'react';
import { HashRouter as Router, Route, Switch , Redirect} from 'react-router-dom';
// import asyncImport from '../utils/asyncImport';

import Home from '../pages/home';
import Traffic from '../pages/traffic';
// import About from '../pages/about';
// import Map from '../components/map';
// import Marker from '../components/map/marker';


export default () => {
  return <Router>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/traffic" component={Traffic} />
      <Redirect from="/" to="/home" />
    </Switch>
  </Router>
}
