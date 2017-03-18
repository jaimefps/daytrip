import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';
import Trips from './trips';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      router: React.PropTypes.object,
      userInfo: '',
      currentTab: <div />,
    };

    this.handleClick = this.handleClick.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserInfo();
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
    this.setState({ currentTab: e.target.id });
  }

  renderChild() {
    if (this.state.currentTab === 'trips') {
      return <Trips />;
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
            <button onClick={this.handleClick} type="button" id="trips" className="btn btn-primary"><span className="glyphicon glyphicon-star" />
              <div className="hidden-xs">Trips</div>
            </button>
          </div>
          <div className="btn-group" role="group">
            <button onClick={this.handleClick} type="button" id="favorites" className="btn btn-default"><span className="glyphicon glyphicon-heart" />
              <div className="hidden-xs">Favorites</div>
            </button>
          </div>
          <div className="btn-group" role="group">
            <button onClick={this.handleClick} type="button" id="friends" className="btn btn-default"><span className="glyphicon glyphicon-user" />
              <div className="hidden-xs">Friends</div>
            </button>
          </div>
        </div>
        {this.renderChild()}
      </div>
    );
  }
}
