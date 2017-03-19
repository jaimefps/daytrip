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
      coordinate: [],
      coordinates: [],
      place: {},
      images: [],
      location: '',
      tripName: '',
      locationName: '',
      tip: '',
      toggle: false,
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
        this.bounds = new window.google.maps.LatLngBounds();
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
        this.poly = new window.google.maps.Polyline({
          strokeColor: '#000000',
          icons: [{
            icon: { path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
            offset: '100%'
          }],
          strokeOpacity: 1.0,
          strokeWeight: 3
        });
        this.poly.setMap(this.map);
      },
    });
  }

  componentWillUnmount() {
    window.google = null;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { tripName, locations, tips, names, description, images, coordinates } = this.state;
    const username = this.props.username;
    axios.post(`${config.server}/trips`, { coordinates, tripName, username, description, images, locations, tips, names }, {
      headers:{ authorization: localStorage.getItem('token') }
    }).then((res) => {
      this.setState({ tripName: '' });
    });
    browserHistory.push('/home');
  }

  addMarker(lat, lng) {
    const icon={
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 8.5,
      fillColor: "#F00",
      fillOpacity: 0.4,
      strokeWeight: 0.4
    }
    var contentString = `<div id="content"><div id="siteNotice"></div>
      <h3 id="firstHeading" class="firstHeading">${this.state.locationName}</h3>
      <div id="bodyContent"><p>
      <p><b>Address: </b> ${this.state.location}</p>
      <b>Tips: </b>${this.state.tip}</p></div></div>`;
    var infowindow = new window.google.maps.InfoWindow({ content: contentString });
    var marker = new window.google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      icon,
      title: this.state.locationName,
      animation: window.google.maps.Animation.DROP
    });
    var path = this.poly.getPath();
    path.push({ lat:() => lat, lng:() => lng })
    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });
    this.bounds.extend(marker.position)
    this.map.fitBounds(this.bounds)
    var zoom = this.map.getZoom();
    this.map.setZoom(zoom > 14 ? 14 : zoom);
  }

  renderLocations() {
    return this.state.locations.map((loc, i) => <div key={i}><br /><LocationTile image={this.state.images[i]} name={this.state.names[i]} tip={this.state.tips[i]} location={loc} /></div>);
  }

  handleChange(e) {
    const state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleAdd(e) {
    e.preventDefault();
    const { 
      location, locationName, names, tip, tips, place, coordinate, coordinates, locations, images 
    } = this.state;
    const image = place[0].photos ? place[0].photos[0].getUrl({ maxWidth: 130, maxHeight: 130 }) : 'https://lh5.googleusercontent.com/-j52sfSDXIK8/V7O0JNtse6I/AAAAAAAAABE/xfYLPW9Eu_4U7JESHATtv26-jZMvpKgzQCLIB/w130-h130-k/' ;
    this.setState({
      locations: [...locations, location],
      names: [...names, locationName],
      tips: [...tips, tip],
      images: [...images, image],
      coordinates: [...coordinates, coordinate]
    });
    this.setState({
      location: '',
      locationName: '',
      tip: '',
    });
    this.addMarker(this.state.coordinate[0], this.state.coordinate[1]);
  }

  createTrip(tripName, description) {
    this.setState({ tripName, description, toggle: true });
  }

  renderForm() {
    const toggle = !this.state.toggle ? 'none' : 'block';
    return (
      <div style={{ maxHeight: '100%', overflow: 'scroll' }} className="col-xs-6">
      {this.state.tripName ? <h3>{this.state.tripName}</h3> : ''}
        <div style={{ display: toggle }} >
          <div className="row">
            <div className="col-md-4">
              <input type="text" name="locationName" value={this.state.locationName} placeholder="Location name" className="form-control" onChange={this.handleChange} />
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
      <div className="createMap row-fluid" style={{height: '100%', width: '100%', position:'relative'}}>
        <div style={{ height: '100%', width: '50%', position:'absolute' }} className="col-xs-6 col-xs-offset-6" id="map"/>
        <DefineTrip toggle={toggle} submit={this.createTrip} />
        {this.renderForm()}
      </div>
    );
  }
}
