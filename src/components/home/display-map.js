import React, { Component } from 'react';
import loadJS from 'loadjs'
 
export default class Gmap extends Component {
  constructor(props) {
    super(props)
    this.addMarker = this.addMarker.bind(this)
  }
  componentWillMount() {
    var context = this;
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVAslO99OwvCeZmCZG37ZOaUZ0p9DIUg&libraries=places", {
      success: () => {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.77, lng: -122.41},
          zoom: 12
        });
        this.props.getMap(this.map)
        var input = document.getElementById('searchmap');
        this.searchBox = new window.google.maps.places.SearchBox(input);
        this.map.addListener('bounds_changed', () => {
          this.searchBox.setBounds(this.map.getBounds());
        });
        this.searchBox.addListener('places_changed', () => {
          var places = this.searchBox.getPlaces();
          console.log(places)
        })

      }
    })
  }

  addMarker(lat, lng) {
    return new window.google.maps.Marker({
      position: {lat, lng},
      map: this.map,
      title: 'Hello World!'
    });
  }


  render() {
    return ( 
      <div>
        <div style={{height: '400px', width:'500px', margin:'auto'}} id="map">
        </div>
        <input id="searchmap" />
      </div>
    )

  }
} 
