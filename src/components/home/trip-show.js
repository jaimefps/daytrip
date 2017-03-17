import React, { Component } from 'react';
import loadJS from 'loadjs';
import axios from 'axios';
import config from '../../config';

export default class TripShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      coordinates: [],
      data: [],
      images: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const locations = this.props.trip.locations.split('@@');
    const names = this.props.trip.names.split('@@');
    const images = this.props.trip.images.split('@@');
    locations.pop();
    names.pop();
    images.pop();
    const coordinates = this.props.trip.coordinates;
    this.setState({ locations, coordinates, images });
  }

  // axios.post(`${config.server}/trips`, { name, username, description}.then((res) => {
  //   this.setState({ name: '' });
  // });

  handleClick(e, trip) {
    console.log(e.target.name);
    console.log(trip);
    // if (e.target.name === 'upvote') {
    //   console.log('upvote clicked', this.props.trip.likes);
    // } else if (e.target.name === 'downvote') {
    //   this.props.trip.likes = this.props.trip.likes + 1;
    //   console.log('downvote clicked', this.props.trip.likes);
    // }
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.trip.name}, {this.props.trip.likes} likes!
            <button name="upvote" onClick={(e) => { this.handleClick(e, this.props.trip); }}>Upvote</button>
            <button name="downvote" onClick={(e) => { this.handleClick(e, this.props.trip); }}>Downvote</button>
          </h3>
        </div>
        <div className="panel-body">
          <div className="col-md-3">
            <img src={this.state.images[0]} />
          </div>
          <div className="col-md-9" style={{ wordWrap: 'break-word' }}>{this.props.trip.description}</div>
        </div>
      </div>
    );
  }
}
