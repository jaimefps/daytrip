import React, { Component } from 'react';
import loadJS from 'loadjs';
import axios from 'axios';
import config from '../../config';
import LocationTile from '../trip/locationtile'
import _ from 'lodash';
import svg from '../trip/Flag_4.svg'

export default class TripDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  fetchData() {
    return axios.get(`${config.server}/trips?id=${this.props.params.id}`, {
      headers:{ authorization: localStorage.getItem('token') }
    }).then(res => this.setState({ data: res.data }))
  }

  componentDidMount() {   
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVAslO99OwvCeZmCZG37ZOaUZ0p9DIUg&libraries=places', {
      success: () => {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: 37.769, lng: -122.446 },
          zoom: 12,
        });
        this.bounds = new window.google.maps.LatLngBounds();
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
    const icon = {
      url: svg,
      scaledSize: new window.google.maps.Size(64, 64)
    }
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
        icon,
        title: this.state.locationName,
        animation: window.google.maps.Animation.DROP
      });

      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });

      var path = this.poly.getPath();
      this.bounds.extend(marker.position)
      this.map.fitBounds(this.bounds)
      var zoom = this.map.getZoom();
      this.map.setZoom(zoom > 14 ? 14 : zoom);
      return path.push({ lat:() => loc[0], lng:() => loc[1] })
    })
  }

  renderLocations() {
    if (!this.state.data.locations) return [];
    const { locations, names, images, tips } = this.state.data
    return locations.map((loc, i) => <div key={i}><LocationTile image={images[i]} name={names[i]} tip={tips[i]} location={loc} /></div>);
  }



  render() {
    return (
      <div className="createMap" style={{height: '100%', width: '100%', position:'relative'}}>
        <div style={{ height: '100%', width: '50%', position:'absolute' }} className="col-xs-6 col-xs-offset-6" id="map" />
        <div className="col-xs-6" style={{ maxHeight: '100%', overflow: 'scroll' }}> 
          <div className="col-xs-12">{this.state.data.tripName ? <h1 style={{fontFamily:'lobster'}}>{this.state.data.tripName}<hr/></h1> : ''}</div>
          {this.renderLocations()}
        </div>
      </div>
      )

  }
}