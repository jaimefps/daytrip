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
    };

    this.fetchTrips = this.fetchTrips.bind(this);
  }

  componentDidMount() {
    this.fetchTrips();
  }

  componentWillUpdate() {
    this.fetchTrips();
  }

  fetchTrips() {
    return axios.get(`${config.server}/trips`).then(res => this.setState({ tripData: res.data }));
  }

  render() {
    const tripComponents = this.state.tripData.map(trip => <Trip trip={trip} fetchkey={trip._id} />);
    return (<div className="createMap">
      <br />
      {tripComponents}
    </div>);
  }
}
