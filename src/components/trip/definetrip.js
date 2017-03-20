import React, { Component } from 'react';

export default class DefineTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  capitalize(string) {
    return string.split(' ').map(word => word[0].toUpperCase()+word.slice(1)).join(' ')
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, description } = this.state;
    this.props.submit(this.capitalize(name), description);
  }

  render() {
    return (
      <form style={{ display: this.props.toggle }} className="form-group col-xs-6 col-xs-offset-6" onSubmit={this.handleSubmit}>
        <input required value={this.state.name} name="name" onChange={this.handleChange} type="text" className="form-control" placeholder=" Name your trip " />
        <br />
        <textarea required name="description" className="form-control" placeholder=" Add a description " value={this.state.description} onChange={this.handleChange} />
        <br />
        <button action="submit" className="btn btn-primary">Create Trip</button>
      </form>
    );
  }
}
