import React, { Component } from 'react';

export default function(Comp) {
	return class RequireAuth extends Component {
		static contextTypes = {
			router: React.PropTypes.object
		}

		componentWillMount() {
			if(!this.props.authenticated) {
				this.context.router.push('/');
			}
		}

		componentWillUpdate(nextProps) {
			if (!this.props.authenticated) {
				this.context.router.push('/')
			}
		}

		render() {
			return <Comp {...this.props} />
		}
	}
}