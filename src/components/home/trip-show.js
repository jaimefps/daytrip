import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';
import _ from 'lodash';
import { Link } from 'react-router';

export default class TripShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      data: [],
      images: [],
      image: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateRoute = this.updateRoute.bind(this);
  }

  componentDidMount() {
    const { locations, images } = this.props.trip;
    this.setState({ locations, images });
    this.setState({ image: images[0].slice(0, images[0].length-12)+'w200-h200-k/' })
  }


  updateRoute(route, action) {
    const { username, trip: { _id, likes, likesByUsers } } = this.props;
    const del = (action === 'delete');
    axios.put(`${config.server}/${route}`, { _id, likes, username, del, likesByUsers }, {
      headers:{ authorization: localStorage.getItem('token') }
    }).then((res) => {
      this.props.fetchUserData();
      this.props.fetchTrips();
    });
  }


  handleClick(e) {
    if (e.target.name === 'Add Like') {
      this.props.trip.likes += 1;
      this.props.trip.likesByUsers.push(this.props.username);
      this.updateRoute('trips');
    } else if (e.target.name === 'Remove Like') {
      this.props.trip.likes -= 1;
      _.pull(this.props.trip.likesByUsers, this.props.username)
      this.updateRoute('trips', 'delete');
    } else if (e.target.name === 'favorite') {
      const action = this.renderFavoritesButtonCaption() === 'Remove from favorites' ? 'delete' : null;
      this.updateRoute('user', action);
    }
  }

  renderFavoritesButtonCaption() {
    const { userData, trip } = this.props;
    return _.includes(userData.favorites, trip._id) ? 'Remove from favorites' : 'Add to favorites';
  }


  renderLikesButtonCaption() {
    const {trip, username} = this.props;
    return _.includes(trip.likesByUsers, username) ? 'Remove Like' : 'Add Like'
  }

  render() {
    const send = `/trip/${this.props.trip._id}`
    return (
      <div className="container" style={{width: '150%'}}>    
        <div className="row">
          <div className="col-md-8">        
            <div className="panel panel-default  panel--styled">
              <div className="panel-body">
                <div className="col-md-12 panelTop">  
                  <div className="col-md-4">  
                    <img className="img-responsive" src={this.state.image} alt=""/>
                  </div>
                  <div className="col-md-8">  
                    <h2>{this.props.trip.tripName} | {this.props.trip.likes} Like(s)</h2>
                    <p>{this.props.trip.description}</p>
                  </div>
                </div>
                <div className="col-md-12 panelBottom">
                <br />
                  <div className="col-md-4 text-center">
                    <Link to={send}><button className="btn btn-primary"><span className="glyphicon glyphicon glyphicon-map-marker"></span>  View Trip</button></Link>           
                  </div>
                  <div className="col-md-4 text-center">
                    <button className="btn btn-primary" style={{ color: 'white'}} name={this.renderLikesButtonCaption()} onClick={this.handleClick}>{this.props.trip.likes} <span style={{marginRight:'5px', marginLeft:'5px'}}>|</span> <span className="glyphicon glyphicon-thumbs-up"></span> {this.renderLikesButtonCaption()}</button>
                  </div>
                  <div className="col-md-4 text-center">
                     <button className="btn btn-primary" style={{ color: 'white' }} name="favorite" onClick={this.handleClick}><span className="glyphicon glyphicon-heart"></span> {this.renderFavoritesButtonCaption()}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
