import React, { Component } from 'react';
import Searchbar from './searchbar';
import { Link } from 'react-router';

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  renderLinks() {
    if(!this.props.authenticated) {
      return [   
        <li key={1}><Link to="/signin">Sign In</Link></li>,
        <li key={2}><Link to="/signup">Sign Up</Link></li>
      ]
    } else {
      return <li><Link to="/signout">Sign Out</Link></li>
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand">Day Trip</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav" />
            <ul className="nav navbar-nav navbar-right">
            {this.renderLinks()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

