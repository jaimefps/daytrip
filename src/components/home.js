import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import Trip from './home/trip-show';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripData: [],
      tripComponents: [],
      userData: {}
    };
    this.fetchUserData = this.fetchUserData.bind(this);
    this.fetchTrips = this.fetchTrips.bind(this);
  }

  componentDidMount() {
    this.fetchUserData();
    this.fetchTrips();
  }

  fetchTrips() {
    return axios.get(`${config.server}/trips`, {
      headers:{ authorization: localStorage.getItem('token') }
    }).then(res => this.setState({ tripData: res.data }));
  }

  fetchUserData() {
    return axios.get(`${config.server}/user?username=${this.props.username}`, {
      headers:{ authorization: localStorage.getItem('token') }
    }).then(res => this.setState({userData: res.data}))
  }

  render() {
    const tripComponents = this.state.tripData.map(trip => <Trip trip={trip} key={trip._id} username={this.props.username} userData={this.state.userData} fetchUserData={this.fetchUserData}/>);
    return (
    <div>
      <div className="col-xs-8">
        <h3>Trips near San Francisco, CA</h3>
        {tripComponents}
      </div>
      <div className="col-xs-4">
        Other Content Here
      </div>
    </div>);
  }
}
