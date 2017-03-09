import React, { Component } from 'react';
import Searchbar from './searchbar';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <Link to="/" className="navbar-brand">DayTrip</Link>
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <Link to="/signin">Sign In</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
