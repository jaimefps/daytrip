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
    this.setState({ term: '' });
    this.props.getSearchTerm('');
  }

  handleChange(e) {
    this.setState({term: e.target.value});
    this.props.getSearchTerm(e.target.value);
  }

  render() {
    if (!this.props.doesRender) {
      return <div style={{marginLeft:'100px'}}/>
    }
    return (
      <form className="navbar-form" style={{display: 'inline-block'}} onSubmit={(e)=>e.preventDefault()}>
        <div className="form-group">
          <div className="input-group">
 
            <input className="form-control" value={this.state.term} placeholder="Search" type="text" onChange={this.handleChange}/>
            <a href='#' onClick={this.handleSubmit} className="input-group-addon"><span className="glyphicon glyphicon-remove"></span> </a>
          </div>
        </div>
      </form>
    )
  }
}

 