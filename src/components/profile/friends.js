import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import config from '../../config';


export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rank: 0,
      created: 0,
    };
  }

  componentDidMount() {
    this.fetchTrips();
  }

  handleClick() {
    const userLink = `/profile/${this.props.friend}`;
    browserHistory.replace(userLink);
  }

  fetchTrips() {
    return axios.get(`${config.server}/trips`, {
      params: {
        username: this.props.friend
      },
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })
    .then(res => this.setState({ rank: res.data.reduce((a,b) => a + b.likes, 0), created: res.data.length }))
  }

  render() {
    console.log(this.state);
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <img className="friend_avatar" src="http://jeanbaptiste.bayle.free.fr/AVATAR/white-grey_default_avatar17.jpg" alt={''+ this.props.friend + " user avatar"}/>
          <div className="friend_info">
            <h4 onClick={this.handleClick.bind(this)} style={{ cursor: 'pointer' }}>Traveler: {this.props.friend}</h4>
            <h4> Rank: {this.state.rank} </h4>
            <h4> Trips Created: {this.state.created} </h4>
          </div>
        </div>
      </div>
    );
  }
}

