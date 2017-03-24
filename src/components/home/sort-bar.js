import React, { Component } from 'react';

export default class SortBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newest: '',
      likes: 'active',
      tripname: '',
      oldest: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.cycleActive = this.cycleActive.bind(this);
  }

  cycleActive(name) {
    this.setState({ newest: '', likes: '', tripname: '', oldest: '' });
    const state = {};
    state[name] = 'active';
    this.setState(state);
  }

  handleClick(e) {
    this.cycleActive(e.target.name);
    this.props.sort(e.target.name);
  }
  render() {
    return (
      <nav className="affix col-xs-4 navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">Sort By</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right" style={{fontSize: '12px'}}>
              <li className={this.state.likes} style={{ cursor: 'pointer' }}><a onClick={this.handleClick} name="likes">Likes</a></li>
              <li className={this.state.newest} style={{ cursor: 'pointer' }}><a onClick={this.handleClick} name="newest">Newest</a></li>
              <li className={this.state.oldest} style={{ cursor: 'pointer' }}><a onClick={this.handleClick} name="oldest">Oldest</a></li>
              <li className={this.state.tripname} style={{ cursor: 'pointer' }}><a onClick={this.handleClick} name="tripname">Trip Name</a></li>
            </ul>
          </div>
        </div>
      </nav>

    );
  }
}
