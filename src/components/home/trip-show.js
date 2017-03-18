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
    this.updateRoute = this.updateRoute.bind(this); 
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


  updateRoute(trip, route) {
    const { _id, likes } = trip;
    const { username } = localStorage;
    axios.put(`${config.server}/${route}`, { _id, likes, username }).then((res) => {
      console.log('put request sent from trip-show.js for likes', res); 
    });
  }


  handleClick(e, trip) {
    if (e.target.name === 'upvote') {
      trip.likes += 1;
      this.updateRoute(trip, 'trips');
    } else if (e.target.name === 'downvote') {
      trip.likes -= 1;
      this.updateRoute(trip, 'trips');
    } else if (e.target.name === 'favorite'){
      this.updateRoute(trip, 'user');
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
            <button name="favorite" onClick={(e) => { this.handleClick(e, this.props.trip); }}>Favorite</button>
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
