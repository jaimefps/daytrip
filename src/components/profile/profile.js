import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';
import Trips from './trips';
import Favorites from './favorites';
import Friends from './friends';
import _ from 'lodash';

export default class Profile extends Component {
  static contextTypes = {
      router: React.PropTypes.object
  }
  
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      currentTab: <div />,
      tripsTab: 'btn btn-primary',
      favoritesTab: 'btn btn-default',
      friendsTab: 'btn btn-default',
      tripData: [],
      userTrips:[]
    };

    this.handleClick = this.handleClick.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserInfo();
  }

  componentDidMount() {
    this.fetchTrips();
    this.setState({ currentTab: 'trips' });
  }

  componentWillMount() {
    if (this.props.username !== this.props.params.username) {
      this.context.router.push('/home');
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.username !== this.props.params.username) {
      this.context.router.push('/home');
    }
  }

  fetchTrips() {
    return axios.get(`${config.server}/trips`, {
      headers:{ authorization: localStorage.getItem('token') }
    }).then(res => this.setState({ tripData: res.data }))
    .then(() => axios.get(`${config.server}/trips`, { 
      params: { 
        username: this.props.username 
      }, 
      headers:{ 
        authorization: localStorage.getItem('token') 
      } 
    }))
    .then(res => this.setState({ userTrips: res.data }))
  }

  getUserInfo() {
    return axios.get(`${config.server}/user`, { 
      params: { 
        username: this.props.username 
      }, 
      headers:{ 
        authorization: localStorage.getItem('token') 
      } 
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
  }

  renderChild() {
    if (this.state.currentTab === 'trips') {
      return this.state.userTrips.map(trip => <Trips trip={trip} key={trip._id}/>);
    }
    if (this.state.currentTab === 'favorites') {
      return this.state.tripData.filter(trip => _.includes(this.state.userInfo.favorites, trip._id))
      .map(favorite => <Favorites favorite={favorite} key={favorite._id}/>);
    }
    if (this.state.currentTab === 'friends') {
      return <Friends />;
    }
  }

  render() {
    return (
      <div className="col-xs-6 col-xs-offset-3" style={{overflowY: 'scroll'}}>
        <div className="card hovercard">
          <div className="card-background">
            <img className="card-bkimg" alt="" src="../../../public/bg.jpg" />
          </div>
          <div className="useravatar">
            <img alt="" src="http://www.drodd.com/images12/happy-face15.jpg" />
          </div>
          <div className="card-info"> <span className="card-title">{this.props.username}</span></div>
        </div>
        <div className="btn-pref btn-group btn-group-justified btn-group-lg" role="group" aria-label="...">
          <div className="btn-group" role="group">
            <button onClick={this.handleClick} type="button" id="trips" className={this.state.tripsTab}><span className="glyphicon glyphicon-star" />
              <div onClick={this.handleClick} id="trips" className="hidden-xs">Trips</div>
            </button>
          </div>
          <div className="btn-group" role="group">
            <button onClick={this.handleClick} type="button" id="favorites" className={this.state.favoritesTab}><span className="glyphicon glyphicon-heart"/>
              <div onClick={this.handleClick} id="favorites" className="hidden-xs">Favorites</div>
            </button>
          </div>
          <div className="btn-group" role="group">
            <button onClick={this.handleClick} type="button" id="friends" className={this.state.friendsTab}><span className="glyphicon glyphicon-user" />
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
