import React from 'react';
import ReactDOM from 'react-dom';
import '../public/style.css';
import '../public/bootstrap/css/bootstrap.css'
import { Router, browserHistory, Route, IndexRoute  } from 'react-router';

import App from './components/App';
import Signin from './components/authentication/signin'



ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
     <Route path='signin' component={Signin} />
    </Route>
  </Router>
  ,
  document.getElementById('root')
);

