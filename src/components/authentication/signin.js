import React, { Component } from 'react';

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const { value, name } = event.target;
    const state = {};
    state[name] = value;
    this.setState(state);
  }
  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state
    this.props.signin(username, password)
    this.setState({ username: '', password: '' });
  }

  renderAlert() {
    if (this.props.hasErr) {
      return(
        <div className="alert alert-danger">
          <strong>{this.props.hasErr === 'connection' ? 'Could not connect to server' : 'Incorrect login info'}</strong>
        </div>
      )
    }
  }

  render() {
    return (
      <form className="signin" action="" onSubmit={this.handleSubmit}>
        <fieldset className="form-group">
          <label>Username:</label>
          <input name="username" value={this.state.username} onChange={this.handleChange} className="form-control" required />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" required />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign In</button>       
      </form>
    );
  }
}

