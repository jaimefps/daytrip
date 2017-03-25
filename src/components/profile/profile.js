import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import config from '../../config';
import TripShow from '../home/trip-tile';
import Friends from './friends';
import UpdateProfile from './update';
import _ from 'lodash';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      currentTab: <div />,
      tripsTab: 'btn btn-primary',
      favoritesTab: 'btn btn-default',
      friendsTab: 'btn btn-default',
      tripData: [],
      userTrips: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserInfo();
  }

  componentDidMount() {
    this.fetchTrips();
    this.setState({ currentTab: 'trips' });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userInfo: '',
      currentTab: <div />,
      tripsTab: 'btn btn-primary',
      favoritesTab: 'btn btn-default',
      friendsTab: 'btn btn-default',
      tripData: [],
      userTrips: [],
    });
    this.props.params.username = nextProps.router.params.username;
    this.fetchTrips();
    this.setState({ currentTab: 'trips' });
    this.getUserInfo();
  }

  fetchTrips() {
    return axios.get(`${config.server}/trips`, {
      headers: { authorization: localStorage.getItem('token') },
    }).then(res => this.setState({ tripData: res.data }))
    .then(() => axios.get(`${config.server}/trips`, {
      params: {
        username: this.props.params.username,
      },
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }))
    .then(res => this.setState({ userTrips: res.data }));
  }

  getUserInfo() {
    return axios.get(`${config.server}/user`, {
      params: {
        username: this.props.params.username,
      },
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })
    .then((res) => {
      this.setState({ userInfo: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  handleClick(e) {
    if (e.target.id === 'trips') {
      this.setState({
        currentTab: e.target.id,
        tripsTab: 'btn btn-primary',
        favoritesTab: 'btn btn-default',
        friendsTab: 'btn btn-default',
      });
    }
    if (e.target.id === 'favorites') {
      this.setState({
        currentTab: e.target.id,
        tripsTab: 'btn btn-default',
        favoritesTab: 'btn btn-primary',
        friendsTab: 'btn btn-default',
      });
    }
    if (e.target.id === 'friends') {
      this.setState({
        currentTab: e.target.id,
        tripsTab: 'btn btn-default',
        favoritesTab: 'btn btn-default',
        friendsTab: 'btn btn-primary',
      });
    }
    if (e.target.id === 'avatar'){
      this.setState({
        currentTab: e.target.id,
        tripsTab: 'btn btn-default',
        favoritesTab: 'btn btn-default',
        friendsTab: 'btn btn-default',
      });
    }
  }

  renderChild() {
    if (this.state.currentTab === 'trips') {
      if (!this.state.userTrips.length) return <h2 className="text-center"> No Trips Yet </h2>;
      return this.state.userTrips.map(trip => <TripShow routeUser={this.props.params.username} username={this.props.username} userData={this.state.userInfo} trip={trip} key={trip._id} fetchUserData={this.getUserInfo} />);
    }
    if (this.state.currentTab === 'favorites') {
      if (!this.state.userInfo.favorites.length) return <h2 className="text-center"> No Favorites Yet </h2>;
      return this.state.tripData.filter(trip => _.includes(this.state.userInfo.favorites, trip._id))
      .map(favorite => <TripShow routeUser={this.props.params.username} username={this.props.username} userData={this.state.userInfo} trip={favorite} key={favorite._id} fetchUserData={this.getUserInfo} />);
    }
    if (this.state.currentTab === 'friends') {
      if (!this.state.userInfo.friends.length) return <h2 className="text-center"> No Friends Yet </h2>;
      return this.state.userInfo.friends.map(friend => <Friends friend={friend} key={Math.random()} />);
    }
    if (this.state.currentTab === 'avatar') {
      //completely unhackable authentication
      if (this.state.userInfo.username === this.props.username){
        return <UpdateProfile username={this.props.username} avatarUrl={this.state.userInfo.avatar}/>;
      } else {
        return <img src={this.state.userInfo.avatar} />
      }
    }
  }

  render() {
    console.log('USERINFO', this.state.userInfo);
    return (
      <div className="col-md-6 col-md-offset-3" style={{ overflowY: 'scroll' }}>
        <div className="card hovercard">
          <div className="card-background">
            <img className="card-bkimg" alt="" src="../../../public/bg.jpg" />
          </div>
          <div className="useravatar">
            <img alt="User Avatar" src={this.state.userInfo.avatar ? this.state.userInfo.avatar : "https://maxcdn.icons8.com/windows10/PNG/512/User_Interface/cat_profile-512.png"}
              onClick={this.handleClick} id="avatar"/>
          </div>
          <div style={{border:"1px dotted lightgrey", backgroundColor: "#F2F6F8"}}>
            <h4>Traveler: {this.props.params.username} <span className="user_rank">Rank: {this.state.userTrips ? this.state.userTrips.reduce((a,b) => a + b.likes, 0): 0}</span> Trips Created: {this.state.userTrips.length}</h4> 
          </div>
        </div>
        <div className="btn-pref btn-group btn-group-justified btn-group-lg" role="group" aria-label="...">
          <div className="btn-group" role="group">
            <button onClick={this.handleClick} type="button" id="trips" className={this.state.tripsTab}><span onClick={this.handleClick} id="trips" className="glyphicon glyphicon-map-marker" />
              <div onClick={this.handleClick} id="trips" className="hidden-xs">Trips</div>
            </button>
          </div>
          <div className="btn-group" role="group">
            <button onClick={this.handleClick} type="button" id="favorites" className={this.state.favoritesTab}><span onClick={this.handleClick} id="favorites" className="glyphicon glyphicon-heart" />
              <div onClick={this.handleClick} id="favorites" className="hidden-xs">Favorites</div>
            </button>
          </div>
          <div className="btn-group" role="group">
            <button onClick={this.handleClick} type="button" id="friends" className={this.state.friendsTab}><span onClick={this.handleClick} id="friends" className="glyphicon glyphicon-user" />
              <div className="hidden-xs" onClick={this.handleClick} id="friends">Friends</div>
            </button>
          </div>
        </div>
        <br />
        {this.renderChild()}
      </div>
    );
  }
}
