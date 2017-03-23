import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import config from '../../config';


export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleClick() {
    const userLink = `/profile/${this.props.friend}`;
    browserHistory.replace(userLink);
  }

  getFriendInfo() {
    return axios.get(`${config.server}/user`, {
      params: {
        username: this.props.friend,
      },
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })
    .then((res) => {
      this.setState({ friendInfo: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <img className="friend_avatar" src="http://jeanbaptiste.bayle.free.fr/AVATAR/white-grey_default_avatar17.jpg" />
          <div className="friend_info">
            <h4 onClick={this.handleClick.bind(this)} style={{ cursor: 'pointer' }}>Traveler: {this.props.friend}</h4>
            <h4> Rank: {'mock #'} </h4>
            <h4> Trips Created: {'mock #'} </h4>
          </div>
        </div>
      </div>
    );
  }
}
