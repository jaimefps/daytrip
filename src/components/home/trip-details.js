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
    return axios.get(`${config.server}/trips?id=${this.props.params.id}`).then(res => this.setState({ data: res.data }))
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

  componentWillUnmount() {
    window.google = null;
  }

  addMarkers() {
    console.log(this.state.data)
    this.state.data.coordinates.map((loc, i) => {
      var contentString = `<div id="content"><div id="siteNotice"></div>
      <h3 id="firstHeading" class="firstHeading">${this.state.data.names[i]}</h3>
      <div id="bodyContent"><p>
      <p><b>Address: </b> ${this.state.data.locations[i]}</p>
      <b>Tips: </b>${this.state.data.tips[i]}</p></div></div>`;
      var infowindow = new window.google.maps.InfoWindow({ content: contentString });
      var marker = new window.google.maps.Marker({
        position: { lat:loc[0], lng:loc[1] },
        map: this.map,
        title: this.state.locationName,
        animation: window.google.maps.Animation.DROP
      });
      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
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