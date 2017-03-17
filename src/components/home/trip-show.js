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

    // this.handleClick = this.handleClick.bind(this);
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


  updateLikes(trip) {
    const _id = trip._id;
    const likes = trip.likes;
    axios.put(`${config.server}/trips`, { _id, likes }).then((res) => {
      console.log('put request sent from trip-show.js');
    });
  }

  handleClick(e, trip) {
    if (e.target.name === 'upvote') {
      trip.likes += 1;
      this.updateLikes(trip);
    } else if (e.target.name === 'downvote') {
      trip.likes -= 1;
      this.updateLikes(trip);
    }
  }

  render() {
    return (
      <div className="panel panel-info tiles">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.trip.name}, {this.props.trip.likes} likes!
            <div className="divider" />
            <button name="upvote" onClick={(e) => { this.handleClick(e, this.props.trip); }}>Upvote</button>
            <div className="divider" />
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
