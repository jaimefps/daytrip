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

  componentDidMount() {
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVAslO99OwvCeZmCZG37ZOaUZ0p9DIUg&libraries=places", {
      success: this.onSuccess.bind(this)
    })
  } 

  onSuccess() {
    this.map = new window.google.maps.Map(document.getElementById('homemap'), {
      center: {lat: 37.77, lng: -122.41},
      zoom: 12
    });
    const locations = this.props.trip.locations.split('@@');
    locations.pop();
    const coordinates = this.props.trip.coordinates;
    this.setState({ locations, coordinates });
    var SF = new window.google.maps.LatLng(37.77, -122.41);
    var service = new window.google.maps.places.PlacesService(this.map);
    locations.map((loc,i) => {
      loc = i === 0 ? loc : loc.slice(1);
      var request = {
        location: SF,
        radius: '500',
        query: loc
      };
      service.textSearch(request, (results) => {
        this.setState({data: [...this.state.data, results[0].name]})
      });

  })
    
  }

  render() {
    return (
      <div className="panel panel-info">
       <div className="panel-heading">
         <h3 className="panel-title">{this.props.trip.name}</h3>
       </div>
       <div className="panel-body">
         <div className="col-md-4">
           {/*<img src={props.place[0].photos[0].getUrl({ maxWidth: 130, maxHeight: 130 })} />*/}
         </div>
         <div className="col-md-8" style={{ wordWrap: 'break-word' }}>{this.props.trip.description}</div>
       </div>
     </div>


    )
  }
}