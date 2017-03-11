import React, { Component } from 'react';
import loadJS from 'loadjs'
 
export default class Gmap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations:[],
      term: ''
    }
    this.addMarker = this.addMarker.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
          var loc = context.state.locations
          console.log(places)
          context.setState({locations: [...loc, places]})
          context.addMarker(places[0].geometry.location.lat(), places[0].geometry.location.lng())
          context.setState({ term: '' })
        })

      }
    })
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
    })
  }

  handleChange(e) {
    this.setState({term: e.target.value})
  }


  render() {
    return ( 
      <div>
        <div style={{height: '400px', width:'500px', margin:'auto'}} id="map" />
        <input id="searchmap" className="form-control" value={this.state.term} onChange={this.handleChange}/>
        {this.renderLocations()}
        <form>
          <button action="submit" className="btn btn-primary">Create Trip</button>  
        </form>
      </div>
    )

  }
} 
