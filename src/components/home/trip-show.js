import React, { Component } from 'react';
import loadJS from 'loadjs';
import axios from 'axios';
import config from '../../config';
import _ from 'lodash'

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


  updateRoute(route, action) {
    const { username, trip:{_id, likes} } = this.props;
    let del = false
    if (action === 'delete') {del = true;}
    axios.put(`${config.server}/${route}`, { _id, likes, username, del }).then((res) => {
      this.props.fetchUserData() 
    });
  }


  handleClick(e) {
    if (e.target.name === 'upvote') {
      this.props.trip.likes += 1;
      this.updateRoute('trips');
    } else if (e.target.name === 'downvote') {
      this.props.trip.likes -= 1;
      this.updateRoute('trips');
    } else if (e.target.name === 'favorite'){
      const action = this.renderFavoritesButtonCaption() === 'Remove from favorites' ? 'delete' : null
      this.updateRoute('user', action);
    }
  }

  renderFavoritesButtonCaption() {
    const {userData, trip} = this.props; 
    return _.includes(userData.favorites, trip._id) ? 'Remove from favorites' : 'Add to favorites';
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.trip.name}, {this.props.trip.likes} likes!
            <div className="divider" />
            <button name="upvote" onClick={this.handleClick}>Upvote</button>
            <div className="divider" />
            <button name="downvote" onClick={this.handleClick}>Downvote</button>
            <button name="favorite" onClick={this.handleClick}>{this.renderFavoritesButtonCaption()}</button>
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
