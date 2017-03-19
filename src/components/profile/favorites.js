import React, { Component } from 'react';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.favorite.likes} likes!</h3>
        </div>
        <div className="panel-body">
          <div className="col-md-3">
            <img src={this.props.favorite.images[0]} alt="" />
          </div>
          <div className="col-md-9" style={{ wordWrap: 'break-word' }}>{this.props.favorite.description}</div>
        </div>
      </div>
    );
  }
}

