import React, { Component } from 'react';
import loadJS from 'loadjs';
import axios from 'axios';
import config from '../../config';
import LocationTile from './locationtile';
import DefineTrip from './definetrip';
import { browserHistory } from 'react-router';

export default class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      names: [],
      tips: [],
      location: '',
      name: '',
      locationname: '',
      toggle: false,
      tip: '',
      coordinate: [],
      place: {},
      places: [],
      images: [],
      likes: 0,
    };

    this.addMarker = this.addMarker.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.createTrip = this.createTrip.bind(this);
  }

  componentDidMount() {
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVAslO99OwvCeZmCZG37ZOaUZ0p9DIUg&libraries=places', {
      success: () => {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: 37.769, lng: -122.446 },
          zoom: 12,
        });

        const input = document.getElementById('searchmap');
        this.searchBox = new window.google.maps.places.SearchBox(input);
        this.map.addListener('bounds_changed', () => {
          this.searchBox.setBounds(this.map.getBounds());
        });

        this.searchBox.addListener('places_changed', () => {
          const place = this.searchBox.getPlaces();
          this.setState({ coordinate: [place[0].geometry.location.lat(), place[0].geometry.location.lng()] });
          this.setState({ location: place[0].formatted_address, place });
        });
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, locations, tips, names, description, images, likes } = this.state;
    const username = this.props.username;
    axios.post(`${config.server}/trips`, { name, username, description, images: images.map(item => `${item}@@`), locations: locations.map(item => `${item}@@`), tips: tips.map(item => `${item}@@`), names: names.map(item => `${item}@@`) }).then((res) => {
      this.setState({ name: '' });
    });
    browserHistory.push('/home');
  }

  addMarker(lat, lng) {
    return new window.google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: 'Hello World!',
    });
  }

  renderLocations() {
    return this.state.locations.map((loc, i) => <div key={i}><br /><LocationTile place={this.state.places[i]} name={this.state.names[i]} tip={this.state.tips[i]} location={loc} /></div>);
  }

  handleChange(e) {
    const state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleAdd(e) {
    e.preventDefault();
    const { location, locationname, tip, place } = this.state;
    const { locations, names, tips, places, images } = this.state;
    const image = place[0].photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
    this.setState({
      locations: [...locations, location],
      names: [...names, locationname],
      tips: [...tips, tip],
      places: [...places, place],
      images: [...images, image],
    });
    this.setState({
      location: '',
      locationname: '',
      tip: '',
    });
    this.addMarker(this.state.coordinate[0], this.state.coordinate[1]);
  }

  createTrip(name, description) {
    this.setState({ name, description, toggle: true });
  }

  renderForm() {
    const toggle = !this.state.toggle ? 'none' : 'block';
    return (
      <div style={{ maxHeight: '600px', overflow: 'scroll' }} className="col-md-6">
        <div style={{ display: toggle }} >
          <div className="row">
            <div className="col-md-4">
              <input type="text" name="locationname" value={this.state.locationname} placeholder="Location name" className="form-control" onChange={this.handleChange} />
            </div>
            <div className="col-md-8">
              <input
                name="location"
                id="searchmap"
                className="form-control"
                value={this.state.location}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <br />
          <textarea name="tip" className="form-control" placeholder="add your tips" value={this.state.tip} onChange={this.handleChange} />
          <br />
          <div className="row">
            <form className="col-md-3" onSubmit={this.handleAdd}>
              <button action="submit" className="btn btn-primary">Add Location</button>
            </form>
            <form className="col-md-3" onSubmit={this.handleSubmit}>
              <button action="submit" className="btn btn-primary">Create Trip</button>
            </form>
          </div>
          {this.renderLocations()}
        </div>
      </div>
    );
  }

  render() {
    const toggle = this.state.toggle ? 'none' : 'block';
    return (
      <div className="createMap">
        <div style={{ height: '600px', width: '600px' }} className="col-md-6" id="map" />
        <DefineTrip toggle={toggle} submit={this.createTrip} />
        {this.renderForm()}
      </div>
    );
  }
}
