import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

import Header from './header/header';
import config from '../config';
import renderChildren from './render-children';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: this.props.route.routerProps[0],
      username: this.props.route.routerProps[1],
      err: '',
      hasErr: false,
      term:'',
    };
    this.getSearchTerm = this.getSearchTerm.bind(this);
    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
  }

  signup(email, username, password) {
    axios.post(`${config.server}/signup`, { email, username, password }).then((res) => {
      this.setState({ authenticated: true, username });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', username);
      browserHistory.push('/home');
    }).catch((err) => {
      this.setState({ err: err.response.data.error });
    });
  }

  signin(username, password) {
    axios.post(`${config.server}/signin`, { username, password }).then((res) => {
      this.setState({ authenticated: true, username });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', username);
      browserHistory.push('/home');
    }).catch((err) => {
      console.log('ERROR', JSON.stringify(err, null, 2));
      if (!err.response) {
        this.setState({ hasErr: 'connection' });
      } else {
        this.setState({ hasErr: true });
      }
    });
  }

  signout() {
    this.setState({ authenticated: false, username: '' });
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  renderHeader() {
    return this.props.location.pathname !== '/' ?
      <Header getSearchTerm={this.getSearchTerm} authenticated={this.state.authenticated} username={this.state.username} pathname={this.props.location.pathname} /> :
    null;
  }

  getSearchTerm(term) {
    this.setState({ term });
  }

  render() {
    const bgClass = this.props.location.pathname === '/signup' || this.props.location.pathname === '/signin' ? 'landing' : 'app'
    return (
      <div className={bgClass} style={{zIndex:'0'}}>
        {this.renderHeader()}
        { renderChildren(this.props, this.state, this) }
        
      </div>

    );
  }
}

export default App;
