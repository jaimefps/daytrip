import React, { Component } from 'react';
import Searchbar from './searchbar';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <Link to="/" className="navbar-brand">DayTrip</Link>
        </nav>
      </div>
    );
  }
}
