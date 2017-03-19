import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import Trip from './home/trip-show';
import Weather from './home/weather';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripData: [],
      tripComponents: [],
      userData: {},
      weatherData:[],
    };
    this.fetchUserData = this.fetchUserData.bind(this);
    this.fetchTrips = this.fetchTrips.bind(this);
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
  }

  componentDidMount() {
    this.fetchUserData();
    this.fetchTrips();
    this.fetchWeatherData();
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

  fetchWeatherData() {
    axios.get(`${config.server}/weather`, {
      headers:{ authorization: localStorage.getItem('token') }
    }).then(res => this.setState({ weatherData: res.data }))
  }

  render() {
    const tripComponents = this.state.tripData.map(trip => <Trip trip={trip} key={trip._id} username={this.props.username} userData={this.state.userData} fetchUserData={this.fetchUserData}/>);
    return (
    <div style={{maxWidth:'1400px', margin: 'auto'}}>
      <div className="col-xs-8">
        <br/>
        {tripComponents}
      </div>
      <br/>
      <div className="col-xs-4">
        <Weather data={this.state.weatherData}/>
      </div>
    </div>);
  }
}
