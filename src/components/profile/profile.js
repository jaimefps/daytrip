import React, { Component } from 'react';

export default class Profile extends Component {
  static contextTypes = {
      router: React.PropTypes.object
  }
  componentWillMount() {
    if(this.props.username !== this.props.params.username) {
      this.context.router.push('/');
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.username !== this.props.params.username) {
      this.context.router.push('/')
    }
  }
  render() {
    return <div>this is user {this.props.username+"'s"} profile</div>
  }
}