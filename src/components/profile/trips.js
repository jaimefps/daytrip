import React, { Component } from 'react';

export default class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="well">
        <div className="tab-content">
          <div className="tab-pane fade in active" id="tab1">
            <h3>Inside trips tab!</h3>
          </div>
        </div>
      </div>
    );
  }
}
