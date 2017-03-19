import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';
import Trips from './trips';
import Favorites from './favorites';
import Friends from './friends';
import _ from 'lodash';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      router: React.PropTypes.object,
      userInfo: '',
      currentTab: <div />,
      tripsTab: 'btn btn-primary',
      favoritesTab: 'btn btn-default',
      friendsTab: 'btn btn-default',
    };

    this.handleClick = this.handleClick.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserInfo();
  }

  componentDidMount() {
    this.fetchTrips();
  }

  componentWillMount() {
    if (this.props.username !== this.props.params.username) {
      this.context.router.push('/');
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.username !== this.props.params.username) {
      this.context.router.push('/');
    }
  }

  fetchTrips() {
    return axios.get(`${config.server}/trips`).then(res => this.setState({ tripData: res.data }));
  }

  getUserInfo() {
    return axios.get(`${config.server}/user`, { params: { username: this.props.username } })
    .then((res) => {
      this.setState({ userInfo: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  handleClick(e) {
    // this.setState({ currentTab: e.target.id });
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
    console.log(this.state.userInfo);
    if (this.state.currentTab === 'trips') {
      // const userTrips = this.state.userInfo.trips.map(trip => <Trips trip={trip} fetchkey={trip._id} />);
      return <Trips />;
    }
    if (this.state.currentTab === 'favorites') {
      const elements = this.state.tripData.filter((trip) => {
        if (_.includes(this.state.userInfo.favorites, trip._id)) {
          return trip;
        }
      });
      return elements.map(favorite => <Favorites favorite={favorite} />);
    }
    if (this.state.currentTab === 'friends') {
      return <Friends />;
    }
  }

  render() {
    return (
      <div className="col-lg-6 col-sm-6">
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
            <button onClick={this.handleClick} type="button" id="trips" className={this.state.tripsTab}><span className="glyphicon glyphicon-map-marker" />
              <div className="hidden-xs">Trips</div>
            </button>
          </div>
          <div className="btn-group" role="group">
            <button onClick={this.handleClick} type="button" id="favorites" className={this.state.favoritesTab}><span className="glyphicon glyphicon-heart" />
              <div className="hidden-xs">Favorites</div>
            </button>
          </div>
          <div className="btn-group" role="group">
            <button onClick={this.handleClick} type="button" id="friends" className={this.state.friendsTab}><span className="glyphicon glyphicon-user" />
              <div className="hidden-xs">Friends</div>
            </button>
          </div>
        </div>
        <br />
        {this.renderChild()}
      </div>
    );
  }
}
