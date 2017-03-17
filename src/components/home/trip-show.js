import React, { Component } from 'react';
import loadJS from 'loadjs';

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

  handleClick(e) {
    if (e.target.name === 'upvote') {
      console.log('upvote clicked');
    } else if (e.target.name === 'downvote') {
      console.log('downvote clicked');
    }
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.trip.name}, {this.props.trip.likes} likes!
            <button name="upvote" onClick={this.handleClick}>Upvote</button>
            <button name="downvote" onClick={this.handleClick}>Downvote</button>
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
