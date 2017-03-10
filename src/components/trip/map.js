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
          console.log(places)
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


  render() {
    return ( 
      <div>
        <div style={{height: '400px', width:'400px'}} id="map">
        </div>
        <input id="searchmap" />
      </div>
    )

  }
} 
