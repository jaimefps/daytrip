import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import '../public/style.css';
import '../public/bootstrap/css/bootstrap.css';
import App from './components/App';
import Signin from './components/authentication/signin';
import Signup from './components/authentication/signup';
import RequireAuth from './components/authentication/requireauth';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="signin" component={Signin} />
      <Route path="signup" component={Signup} />
    </Route>
  </Router>
  ,
  document.getElementById('root'),
);

