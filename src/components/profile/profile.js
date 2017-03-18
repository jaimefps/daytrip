import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      router: React.PropTypes.object,
      userInfo: '',
    };

    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserInfo();
    console.log('this.state.userInfo in Profile constructor', this.state.userInfo);
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
    // return <div>this is user {this.props.username+"'s"} profile</div>
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
            <button type="button" id="stars" className="btn btn-primary" href="#tab1" data-toggle="tab"><span className="glyphicon glyphicon-star" aria-hidden="true" />
              <div className="hidden-xs">Trips</div>
            </button>
          </div>
          <div className="btn-group" role="group">
            <button type="button" id="favorites" className="btn btn-default" href="#tab2" data-toggle="tab"><span className="glyphicon glyphicon-heart" aria-hidden="true" />
              <div className="hidden-xs">Favorites</div>
            </button>
          </div>
          <div className="btn-group" role="group">
            <button type="button" id="following" className="btn btn-default" href="#tab3" data-toggle="tab"><span className="glyphicon glyphicon-user" aria-hidden="true" />
              <div className="hidden-xs">Friends</div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
