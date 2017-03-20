import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Dropdown extends Component {
  render() {
    return (
      <li className="dropdown closed" style={{ zIndex: '100', position: 'relative' }} >
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">{this.props.username} <span className="caret" /></a>
        <ul className="dropdown-menu">
          <li><Link to={`/profile/${this.props.username}`}>My Profile</Link></li>
          <li><Link to="createtrip">Create Trip</Link></li>
          <li role="separator" className="divider" />
          <li><Link to="/signout">Sign Out</Link></li>
        </ul>
      </li>
    );
  }
}
