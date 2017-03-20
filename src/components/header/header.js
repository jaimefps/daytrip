import React, { Component } from 'react';
import { Link } from 'react-router';

import Searchbar from './searchbar';
import Dropdown from './dropdown';

export default class Header extends Component {

  renderLinks() {
    if (!this.props.authenticated) {
      return [
        <li key={1}><Link to="/signin">Sign In</Link></li>,
        <li key={2}><Link to="/signup">Sign Up</Link></li>,
      ];
    }
    return [
      <Dropdown key={1} username={this.props.username} />,
      <Searchbar key={2} getSearchTerm={this.props.getSearchTerm} doesRender={this.props.pathname === '/home'} />,
    ];
  }

  render() {
    const headerClass = this.props.pathname === '/signin' || this.props.pathname === '/signup' ? 'navbar-light' : 'navbar-default';
    return (
      <div>
        <nav role="navigation" className={`navbar navbar-fixed-top tiles ${headerClass}`} style={{ zIndex: '1000' }}>
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              {headerClass === 'navbar-default' ? <Link to="/home" className="navbar-brand">Day Trip</Link> : ''}
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                {this.renderLinks()}
              </ul>
            </div>
          </div>
        </nav>
        {headerClass === 'navbar-light' ? <div className="logo" /> : ''}
      </div>
    );
  }
}

