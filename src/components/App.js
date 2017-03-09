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
      authenticated: false,
      username: ''
    };

    this.signup = this.signup.bind(this);
  }

  signup(email, username, password) {
    axios.post(`${config.server}/signup`, {email, username, password}).then(res => {
      this.setState({ authenticated: true, username: username });
      localStorage.setItem('token', res.data.token);
      browserHistory.push('/home');
    }).catch(err => {
      this.setState({ err: err.response.data.error });
      console.log(this.state.err);
    })
  }

  render() {
    return (
      <div>
        <Header />
        { renderChildren(this.props, this.state, this) }
      </div>
    );
  }
}

export default App;
