import React, { Component } from 'react';
import Loader from 'google-maps'
 
export default class Home extends Component {
  // <GoogleMap defaultCenter={{lat:37.773386, lng: -122.418676}} defaultZoom={12} />
  componentDidMount() {
    var that = this
    Loader.load(function(google) {    
      that.map = new google.maps.Map(document.getElementById('map'), {
       zoom: 12,
       center: { lat: 37.773386, lng: -122.418676 }
     });
    });
  }
  render() {
    return <div> this is a protected page 
    <div style={{height: '400px', width:'400px'}} id="map">
    </div>
    </div>
  }
} 