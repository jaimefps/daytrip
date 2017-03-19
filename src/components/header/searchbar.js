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
      <form className="navbar-form" style={{display: 'inline-block'}}>
        <div className="form-group">
          <div className="input-group">
 
            <input className="form-control" placeholder="Search" type="text" />
            <span className="input-group-addon"><span className="glyphicon glyphicon-search"></span> </span>
          </div>
        </div>
      </form>
    )
  }
}

 