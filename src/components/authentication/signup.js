import React, { Component } from 'react';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
    const { email, username, password } = this.state;
    this.props.signup(email, username, password);
    this.setState({ email: '', username: '', password: '' });
  }

  renderAlert() {
    if (this.props.err) {
      return (
        <div className="alert alert-danger">
          <strong>{this.props.err}</strong>
        </div>
      );
    }
  }

  render() {
    return (
      <form className="signin" action="" onSubmit={this.handleSubmit}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" required />
        </fieldset>
        <fieldset className="form-group">
          <label>Username:</label>
          <input name="username" value={this.state.username} onChange={this.handleChange} className="form-control" required />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" required />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

