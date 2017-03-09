import React, { Component } from 'react';
import Header from './header/header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default App;
