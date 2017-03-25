import React, { Component } from 'react';
import config from '../../config';
import axios from 'axios';

export default class Update extends Component {

  constructor(props){
    super(props);
    this.state = {
      avatar: 'http://'
    }
  }

  handleChange(e){
    console.log(e.target.value);
    this.setState({avatar: e.target.value});
  }

  handleClick(e){
    this.updateProfile();
  }

  updateProfile(action) {
    console.log('trying to updateprofile', this.props.username, this.state.avatar);
    const username = this.props.username;
    const { avatar } = this.state;
    const del = (action === 'delete');
    axios.put(`${config.server}/user`, { username, avatar, del }, {
      headers: { authorization: localStorage.getItem('token') },
    }).then((res) => {
      console.log('response received. Updated the profile');
    });
  }

  render(){
    return(
      <div className="col-md">
      <h2 className="text-center">Update Your Profile</h2>
      <img src={this.props.avatarUrl} className="img-responsive"/>
      <h3>Profile Pic</h3>
      <input
        name="location"
        id="searchmap"
        className="form-control"
        value={this.state.avatar}
        onChange={this.handleChange.bind(this)}
      />
      <button onClick={this.handleClick.bind(this)} name="submit-avatar">Submit</button>
      </div>
    )
  }

}