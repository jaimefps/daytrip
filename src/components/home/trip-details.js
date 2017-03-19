import React, { Component } from 'react';
import loadJS from 'loadjs';
import axios from 'axios';
import config from '../../config';

export default class TripDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  fetchData() {
    return axios.get(`${config.server}/trips?id=${this.props.params.id}`).then(res => this.setState({ data: res.data[0] }))
  }

  componentDidMount() {
    
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVAslO99OwvCeZmCZG37ZOaUZ0p9DIUg&libraries=places', {
      success: () => {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: 37.769, lng: -122.446 },
          zoom: 12,
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
        this.fetchData().then(() => this.addMarkers())
      },
    });
  }

  addMarkers() {
    this.state.data.coordinates.map(loc => {
        var marker = new window.google.maps.Marker({
        position: { lat:loc[0], lng:loc[1] },
        map: this.map,
        title: this.state.locationName,
        animation: window.google.maps.Animation.DROP
      });
    var path = this.poly.getPath();
    path.push({ lat:() => loc[0], lng:() => loc[1] })
    })
  }



  render() {
    return (
      <div className="createMap">
      <div style={{ height: '600px', width: '600px' }} className="col-md-6" id="map" />
      <div> The rest goes here 
      </div>
      </div>
      )

  }
}