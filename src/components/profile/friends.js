import React, { Component } from 'react';
import { browserHistory } from 'react-router';
export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleClick() {
    const userLink = `/profile/${this.props.friend}`;
    browserHistory.replace(userLink);
  }



  render() {
    return (
        <div className="panel panel-default">
          <div className="panel-body">
            <h4 onClick={this.handleClick.bind(this)} style={{ cursor:'pointer' }}>{this.props.friend}</h4>
          </div>
        </div>
    );
  }
}
