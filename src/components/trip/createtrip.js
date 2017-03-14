import React, { Component } from 'react';
import loadJS from 'loadjs';
import axios from 'axios';
import config from '../../config';
import LocationTile from './locationtile'

export default class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations:[],
      names: [],
      tips: [],
      location: '',
      name:'', 
      locationname: '',
      tip: '',
      coordinate: [],
      place: {},
      places: []
    }
    this.addMarker = this.addMarker.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentWillMount() {
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVAslO99OwvCeZmCZG37ZOaUZ0p9DIUg&libraries=places", {
      success: () => {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.77, lng: -122.41},
          zoom: 12
        });

        var input = document.getElementById('searchmap');
        this.searchBox = new window.google.maps.places.SearchBox(input);
        this.map.addListener('bounds_changed', () => {
          this.searchBox.setBounds(this.map.getBounds()); 
        });

        this.searchBox.addListener('places_changed', () => {
          var place = this.searchBox.getPlaces();
          // this.setState(places[0].geometry.location.lat(), places[0].geometry.location.lng());
          this.setState({ location: place[0].formatted_address , place });
        })

      } 
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, locations, tips, names } = this.state;
    const username = this.props.username
    axios.post(`${config.server}/trips`, { name, username, locations, tips, names }).then(res => {
      this.setState({ name: '' })
    })

  }

  addMarker(lat, lng) {
    return new window.google.maps.Marker({
      position: {lat, lng},
      map: this.map,
      title: 'Hello World!'
    });
  }

 renderLocations() {
    return this.state.locations.map((loc, i) => {
      return <LocationTile key={i} place={this.state.places[i]} name={this.state.names[i]} tip={this.state.tips[i]} location={loc} />
    }); 
  }

  handleChange(e) {
    var state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleAdd(e) {
    e.preventDefault();
    var { location, locationname, tip, place } = this.state;
    var { locations, names, tips, places } = this.state;
    this.setState({
      locations: [...locations, location],
      names: [...names, locationname],
      tips: [...tips, tip],
      places: [...places, place]
    })
    this.setState({
      location: '',
      locationname: '',
      tip: '',
    })
  }


  render() {
    return ( 
      <div>
        <div style={{height: '400px', width:'500px'}} className="col-md-6" id="map" />
        <div className="col-md-6">
          <input name="name" onChange={this.handleChange} type="text" className="form-control" placeholder="Name your trip" />
          <br/>
          <div className="row">
            <div className="col-md-4">
              <input type="text" name="locationname" value={this.state.locationname} placeholder="Location name" className="form-control" onChange={this.handleChange}/>
            </div>
            <div className="col-md-8">
              <input name="location" 
              id="searchmap" 
              className="form-control" 
              value={this.state.location} 
              onChange={this.handleChange}/>
            </div>
          </div>
          <br/>
          <textarea name="tip" className="form-control" placeholder="add your tips" value={this.state.tip} onChange={this.handleChange}></textarea>
          <br/>
          <form onSubmit={this.handleSubmit}>
            <button action="submit" className="btn btn-primary">Create Trip</button>  
          </form>
          <form onSubmit={this.handleAdd}>
            <button action="submit" className="btn btn-primary">Add Location</button>  
          </form>
          {this.renderLocations()}
        </div>
      </div>
    );

  }
} 
