import React, { Component } from 'react';

export default class Searchbar extends Component {
  constructor(props) {
    super(props)
    this.state ={
      term: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({term: event.target.value});
  }

  render() {
    return (
      <form  className="navbar-form navbar-left"  onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search" value={this.state.term} onChange={this.handleChange}/>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    )
  }
}