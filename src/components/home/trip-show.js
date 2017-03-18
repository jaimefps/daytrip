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
      data: [],
      images: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateRoute = this.updateRoute.bind(this); 
  }

  componentDidMount() {
    const { locations, images } = this.props.trip
    this.setState({ locations, images });
  }


  updateRoute(route, action) {
    const { username, trip:{_id, likes, likesByUsers} } = this.props;
    let del = (action === 'delete') ?  true : false
    axios.put(`${config.server}/${route}`, { _id, likes, username, del, likesByUsers }).then((res) => {
      this.props.fetchUserData() 
    });
  }


  handleClick(e) {
    if (e.target.name === 'upvote') {
      this.props.trip.likes += 1;
      this.props.trip.likesByUsers.push(this.props.username);
      e.target.name = 'downvote'
      this.updateRoute('trips');
    } else if (e.target.name === 'downvote') {
      this.props.trip.likes -= 1;
      _.pull(this.props.trip.likesByUsers, this.props.username)
      e.target.name = 'upvote'
      this.updateRoute('trips', 'delete');
    } else if (e.target.name === 'favorite'){
      const action = this.renderFavoritesButtonCaption() === 'Remove from favorites' ? 'delete' : null
      this.updateRoute('user', action);
    }
  }

  renderFavoritesButtonCaption() {
    const {userData, trip} = this.props; 
    return _.includes(userData.favorites, trip._id) ? 'Remove from favorites' : 'Add to favorites';
  }

  renderLikesButtonCaption() {
    const {trip, username} = this.props;
    return _.includes(trip.likesByUsers, username) ? 'Remove Like' : 'Add Like'
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.trip.name}, {this.props.trip.likes} likes!
            <div className="divider" />
            <button name="upvote" onClick={this.handleClick}>{this.renderLikesButtonCaption()}</button>
            <div className="divider" />
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
