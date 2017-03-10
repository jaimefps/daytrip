import React, { Component } from 'react';

export default class Signout extends Component {
  componentWillMount() {
    this.props.signout()
  }

  render() {
    return <h1>Successfully signed out</h1>
  }
}