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
      image: '',
    };
    this.handleClick = _.throttle(this.handleClick.bind(this), 1000);
    this.updateRoute = this.updateRoute.bind(this);
  }

  componentDidMount() {
    const { locations, images } = this.props.trip;
    this.setState({ locations, images });
    this.setState({ image: images[0] });
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

  handleFriends(del) {
    axios.patch(`${config.server}/user`, { username: this.props.username, del, friend: this.props.trip.username }, {
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
    } else if (e.target.name === 'friend') {
      if (this.renderFriendsButtonCaption() === 'Remove friend') {
        this.handleFriends(true);
      } else {
        this.handleFriends(false);
      }
    }
  }

  renderFavoritesButtonCaption() {
    const { userData, trip } = this.props;
    return _.includes(userData.favorites, trip._id) ? 'Remove from favorites' : 'Add to favorites';
  }

  renderFriendsButtonCaption() {
    const { userData, trip } = this.props;
    return _.includes(userData.friends, trip.username) ? 'Remove friend' : 'Add friend';
  }


  renderLikesButtonCaption() {
    const {trip, username} = this.props;
    return _.includes(trip.likesByUsers, username) ? 'Remove Like' : 'Add Like'
  }

  renderPanelBottom() {
    const send = `/trip/${this.props.trip._id}`
    if(!this.props.routeUser || this.props.routeUser === this.props.username) {
      return (
        <div className="col-md-12 panelBottom">
          <br />
            <div className="col-md-4 text-center">
              <Link to={send}><button className="btn btn-primary"><span className="glyphicon glyphicon glyphicon-map-marker"></span>  View Trip</button></Link>           
            </div>
            <div>
            <div className="col-md-4 text-center">
              <button className="btn btn-primary" style={{ color: 'white'}} name={this.renderLikesButtonCaption()} onClick={this.handleClick}>{this.props.trip.likes} <span style={{marginRight:'5px', marginLeft:'5px'}}>|</span> <span className="glyphicon glyphicon-thumbs-up"></span> {this.renderLikesButtonCaption()}</button>
            </div>
            <div className="col-md-4 text-center">
               <button className="btn btn-primary" style={{ color: 'white' }} name="favorite" onClick={this.handleClick}><span className="glyphicon glyphicon-heart"></span> {this.renderFavoritesButtonCaption()}</button>
            </div>
            </div>
          </div>
      ) 
    } else {
      return (
        <div className="col-md-12 panelBottom">
          <br />
            <div className="col-md-12 text-center">
              <Link to={send}><button className="btn btn-primary"><span className="glyphicon glyphicon glyphicon-map-marker"></span>  View Trip</button></Link>           
            </div>
          </div>
      ) 
    }
  }

  renderFriendsLink() {
    if (this.props.username !== this.props.trip.username) {
      return <li><a href="#" onClick={this.handleClick} name="friend">{this.renderFriendsButtonCaption()}</a></li>
    } 
  }

  render() {
    const linkUser = `/profile/${this.props.trip.username}`
    return (

          <div className="col-md-8"  style={{width: '100%'}}>        
            <div className="panel panel-default  panel--styled">
              <div className="panel-body">
                <div className="col-md-12 panelTop">  
                  <div className="col-md-4">  
                    <img className="img-responsive" src={this.state.image} alt=""/>
                  </div>
                  <div className="col-md-8">  
                    <h2>{this.props.trip.tripName}</h2>
                    <h4 style={{display:'inline-block'}}>Created By: 
                      <div style={{display:'inline-block', marginLeft:'5px', cursor:'pointer'}} className="dropdown">
                        <span type="button" data-toggle="dropdown">{this.props.trip.username}
                        <span className="caret"></span></span>
                          <ul className="dropdown-menu">
                            <li> <Link style={{textDecoration: 'none', color:'black'}} to={linkUser}>View Profile</Link></li>
                            {this.renderFriendsLink()}
                          </ul>
                        </div></h4>
                    
                    <p style={{wordWrap: 'break-word'}}>{this.props.trip.description}</p>
                  </div>
                </div>
                {this.renderPanelBottom()}
              </div>
            </div>
          </div>
    )
  }
}
