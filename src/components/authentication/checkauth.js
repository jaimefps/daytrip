import React, { Component } from 'react';

export default function(Comp) {
	return class RequireAuth extends Component {
		static contextTypes = {
			router: React.PropTypes.object
		}

		componentWillMount() {
			if(this.props.authenticated) {
				this.context.router.push('/home');
			}
		}

		componentWillUpdate(nextProps) {
			if (this.props.authenticated) {
				this.context.router.push('/home')
			}
		}

		render() {
			return <Comp {...this.props} />
		}
	}
}