import React, { Component } from 'react';
import axios from 'axios'
import Gmap from './home/display-map'
import config from '../config';
import Trip from './home/trip-show'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripData: [],
      tripComponents: [],
      map: false
    };
    this.getMap = this.getMap.bind(this);
  }

  getMap(map) {
    this.setState({ map })
  }

  componentWillMount() {
    this.fetchTrips()
  }

  fetchTrips() {
    return axios.get(`${config.server}/trips`).then(res => this.setState({ tripData: res.data }))
  }

  render() {
    var tripComponents = this.state.tripData.map(trip => <Trip trip={trip} key={trip._id} map={this.state.map}/> );
    return <div> HOME PAGE WITH DISPLAY MAP
    <Gmap getMap={this.getMap} />
    {tripComponents} 
    </div>
  }
} 