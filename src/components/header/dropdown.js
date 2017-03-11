import React, { Component } from 'react';
import { Link } from 'react-router'

export default class Dropdown extends Component {
  render() {
    return (
      <li className="dropdown closed">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">{this.props.username} <span className="caret"></span></a>
        <ul className="dropdown-menu">
          <li><Link to={`/profile/${this.props.username}`}>My Profile</Link></li>
          <li><Link to="createtrip">Create Trip</Link></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" className="divider"></li>
          <li className="dropdown-header">Nav header</li>
          <li><a href="#">Separated link</a></li>
          <li role="separator" className="divider"></li>
          <li><Link to="/signout">Sign Out</Link></li>
        </ul>
      </li>
    )
  }
}