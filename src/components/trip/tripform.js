import React, { Component } from 'react';

export default class TripForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationname: '',
      tip: '',
      location: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleAdd() {
    const { locationname, tip, location } = this.state;
    this.props.handleAdd(locationname, tip, location);
    this.setState({
      locationname: '',
      tip: '',
      location: '',
    });
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-4">
            <input type="text" name="locationname" value={this.state.locationname} placeholder="Location name" className="form-control" onChange={this.handleChange} />
          </div>
          <div className="col-md-8">
            <input
              name="location"
              id="searchmap"
              className="form-control"
              value={this.state.location}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <br />
        <textarea name="tip" className="form-control" placeholder="add your tips" value={this.state.tip} onChange={this.handleChange} />
        <br />
        <div className="row">
          <div className="col-md-3" onClick={this.handleAdd}>
            <button className="btn btn-primary">Add Location</button>
          </div>
          <form className="col-md-3" onSubmit={this.handleSubmit}>
            <button action="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        {this.props.renderLocations()}
      </div>
    );
  }
}
