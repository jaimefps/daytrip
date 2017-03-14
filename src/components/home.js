import React, { Component } from 'react';
import axios from 'axios'
import config from '../config';
import Trip from './home/trip-show'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripData: [],
      tripComponents: [],
    };
  }

  componentDidMount() {
    this.fetchTrips()
  }


  fetchTrips() {
    return axios.get(`${config.server}/trips`).then(res => this.setState({ tripData: res.data }))
  }

  render() {
    var tripComponents = this.state.tripData.map(trip => <Trip trip={trip} key={trip._id} map={this.state.map}/> );
    return <div className="createMap">
    <div id='homemap' />
    {tripComponents} 
    </div>
  }
} 