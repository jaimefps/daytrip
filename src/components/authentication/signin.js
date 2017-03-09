import React, { Component } from 'react';

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <form className="signin" action="">
        <fieldset className="form-group">
          <label>Username:</label>
          <input name="username" className="form-control" require />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input name="password" className="form-control" require />
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

