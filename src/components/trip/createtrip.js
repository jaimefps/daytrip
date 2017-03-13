import React, { Component } from 'react';
import loadJS from 'loadjs';
import axios from 'axios';
import config from '../../config';

export default class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations:[],
      term: '',
      name:''
    }
    this.addMarker = this.addMarker.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    var context = this;
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVAslO99OwvCeZmCZG37ZOaUZ0p9DIUg&libraries=places", {
      success: function() {
        context.map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.77, lng: -122.41},
          zoom: 12
        });

        var input = document.getElementById('searchmap');
        context.searchBox = new window.google.maps.places.SearchBox(input);
        context.map.addListener('bounds_changed', function() {
          context.searchBox.setBounds(context.map.getBounds());
        });

        context.searchBox.addListener('places_changed', function() {
          var places = context.searchBox.getPlaces();
          var loc = context.state.locations;
          context.setState({locations: [...loc, places]});
          console.log(context.state.locations[0])
          context.addMarker(places[0].geometry.location.lat(), places[0].geometry.location.lng());
          context.setState({ term: '' });
        })

      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = this.state.name;
    const username = this.props.username
    const locations = this.state.locations.map(item => item[0].formatted_address)
    const coordinates =  this.state.locations.map(item => [item[0].geometry.location.lat(), item[0].geometry.location.lng()])
    axios.post(`${config.server}/trips`, { name, username, locations, coordinates })
  }

  addMarker(lat, lng) {
    var marker = new window.google.maps.Marker({
      position: {lat, lng},
      map: this.map,
      title: 'Hello World!'
    });
  }

 renderLocations() {
    return this.state.locations.map(loc => {
      return <div key={Math.random()}>{loc[0].formatted_address}</div>
    });
  }

  handleChange(e) {
    var state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }


  render() {
    return ( 
      <div>
        <div style={{height: '400px', width:'500px', margin:'auto'}} id="map" />
        <input name="term" 
          id="searchmap" 
          className="form-control" 
          value={this.state.term} 
          onChange={this.handleChange}/>
        <input name="name" onChange={this.handleChange} type="text" />
        {this.renderLocations()}
        <form onSubmit={this.handleSubmit}>
          <button action="submit" className="btn btn-primary">Create Trip</button>  
        </form>
      </div>
    );

  }
} 
