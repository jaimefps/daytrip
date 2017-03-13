import React, { Component } from 'react';
import loadJS from 'loadjs';

export default class TripShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      coordinates: [],
      data: []
    };
  }

  componentWillMount() {
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVAslO99OwvCeZmCZG37ZOaUZ0p9DIUg&libraries=places", {
      success: this.onSuccess.bind(this)
    })
  } 

  onSuccess() {
    if(!this.props.map) {
      setTimeout(() => this.onSuccess.call(this), 1000)
    } else {
      const locations = this.props.trip.locations.split('@@');
      locations.pop();
      const coordinates = this.props.trip.coordinates;
      this.setState({ locations, coordinates });
      var SF = new window.google.maps.LatLng(37.77, -122.41);
      var service = new window.google.maps.places.PlacesService(this.props.map);
      locations.map((loc,i) => {
        loc = i === 0 ? loc : loc.slice(1);
        var request = {
          location: SF,
          radius: '5000',
          query: loc
        };
        service.textSearch(request, (results) => {
          this.setState({data: [...this.state.data, results[0].name]})
        });

    })
    }
    
  }

  render() {
    return <div>
      <h2>{this.props.trip.name}</h2>
      {this.state.data.map(item => (
        <h5 key={Math.random()}>{item}</h5>
      ))}
    </div>
  }
}