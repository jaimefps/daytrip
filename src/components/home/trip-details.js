import React, { Component } from 'react';
import loadJS from 'loadjs';
import axios from 'axios';
import config from '../../config';
import LocationTile from '../trip/locationtile';
import _ from 'lodash';
import svg from '../trip/Flag_4.svg';
import { Link } from 'react-router';


export default class TripDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lol: 0,
      data: {
        likesByUsers: []
      },
      userInfo: {},
    };
    this.handleClick = this.handleClick.bind(this);
  }

  fetchData() {
    return axios.get(`${config.server}/trips?id=${this.props.params.id}`, {
      headers: { authorization: localStorage.getItem('token') },
    }).then(res => this.setState({ data: res.data }));
  }

  getUserInfo() {
    return axios.get(`${config.server}/user`, {
      params: {
        username: localStorage.getItem('username'),
      },
    })
    .then((res) => {
      this.setState({ userInfo: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
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
            offset: '100%',
          }],
          strokeOpacity: 1.0,
          strokeWeight: 3,
        });
        this.poly.setMap(this.map);
        this.fetchData().then(() => this.addMarkers());
        this.getUserInfo();
      },
    });
  }

  componentWillUnmount() {
    window.google = null;
  }

  addMarkers() {
    const icon = {
      url: svg,
      scaledSize: new window.google.maps.Size(48, 48),
    };
    this.state.data.coordinates.map((loc, i) => {
      const contentString = `<div id="content"><div id="siteNotice"></div>
      <h3 id="firstHeading" class="firstHeading">${this.state.data.names[i]}</h3>
      <div id="bodyContent"><p>
      <p><b>Address: </b> ${this.state.data.locations[i]}</p>
      <b>Tips: </b>${this.state.data.tips[i]}</p></div></div>`;

      const infowindow = new window.google.maps.InfoWindow({ content: contentString });

      const marker = new window.google.maps.Marker({
        position: { lat: loc[0], lng: loc[1] },
        map: this.map,
        icon,
        title: this.state.locationName,
        animation: window.google.maps.Animation.DROP,
      });

      marker.addListener('click', function () {
        infowindow.open(this.map, marker);
      });

      const path = this.poly.getPath();
      this.bounds.extend(marker.position);
      this.map.fitBounds(this.bounds);
      const zoom = this.map.getZoom();
      if (this.state.data.names.length === 1) this.map.setZoom(zoom > 14 ? 14 : zoom);
      return path.push({ lat: () => loc[0], lng: () => loc[1] });
    });
  }

  renderLocations() {
    if (!this.state.data.locations) return [];
    const { locations, names, images, tips } = this.state.data;
    return locations.map((loc, i) => <div key={i}><LocationTile image={images[i]} name={names[i]} tip={tips[i]} location={loc} /></div>);
  }

// jaime and westin work ~~~~~~~~~~~~~~~~~~~~~~> start

  renderLikesButtonCaption() {
    return _.includes(this.state.data.likesByUsers, localStorage.getItem('username')) ? 'Remove Like' : 'Add Like';
  }

  renderFavoritesButtonCaption() {
    return _.includes(this.state.userInfo.favorites, this.state.data._id) ? 'Remove from favorites' : 'Add to favorites';
  }

  updateRoute(route, action) {
    const username = localStorage.getItem('username');
    const { _id, likes, likesByUsers } = this.state.data;
    const del = (action === 'delete');
    axios.put(`${config.server}/${route}`, { _id, likes, username, del, likesByUsers }, {
      headers: { authorization: localStorage.getItem('token') },
    }).then(() => this.getUserInfo() );
  }

  handleClick(e) {
    if (e.target.name === 'Add Like') {
      this.state.data.likesByUsers.push(localStorage.getItem('username'));
      this.updateRoute('trips');
    } 
    else if (e.target.name === 'Remove Like') {
      _.pull(this.state.data.likesByUsers, localStorage.getItem('username'));
      this.updateRoute('trips', 'delete');
    }
    else if (e.target.name === 'Add to favorites') {
      this.state.userInfo.favorites.push(localStorage.getItem('username'));
      this.updateRoute('user');
    } 
    else if (e.target.name === 'Remove from favorites') {
      _.pull(this.state.userInfo.favorites, this.state.data._id);
      this.updateRoute('user', 'delete');
    }
    this.setState({ lol: this.state.lol++ })
  }

  render() {
    let likeBttn = <button className="btn btn-primary tripDetailsBttn" style={{ color: 'white' }} name={this.renderLikesButtonCaption()} onClick={this.handleClick}>
    {this.state.data.likesByUsers.length} 
    <span style={{ marginRight: '5px', marginLeft: '5px' }}>|</span> <span className="glyphicon glyphicon-thumbs-up" /> 
    { this.renderLikesButtonCaption() }
    </button>;
    
    let favBttn = <button className="btn btn-primary tripDetailsBttn" style={{ color: 'white' }} name={this.renderFavoritesButtonCaption()} onClick={this.handleClick}>
    <span className="glyphicon glyphicon-heart" /> 
    { this.renderFavoritesButtonCaption() } 
    </button>

    return (
      <div className="createMap" style={{ height: '100%', width: '100%', position: 'relative' }}>
        <div style={{ height: '100%', width: '50%', position: 'absolute' }} className="col-xs-6 col-xs-offset-6" id="map" />
        <div className="col-xs-6" style={{ maxHeight: '100%', overflow: 'scroll' }}>
          <div className="col-xs-12">{this.state.data.tripName ? <h1 style={{ fontFamily: 'lobster' }}>{this.state.data.tripName}{likeBttn}{favBttn}<hr /></h1> : ''}</div>
          { this.renderLocations() }
        </div>
      </div>
    );
  }
}

// jaime and westin work ~~~~~~~~~~~~~~~~~~~~~~> end
