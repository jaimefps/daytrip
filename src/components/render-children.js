import React from 'react';

export default function renderChildren(props, state, context) {
  return React.Children.map(props.children, (child) => {
    if (child.type.name === 'Signup') {
      return React.cloneElement(child, {
        signup: context.signup,
        err: state.err,
      });
    } else if (child.type.name === 'Signin') {
      return React.cloneElement(child, {
        signin: context.signin,
        hasErr: state.hasErr,
      });
    } else if (child.type.name === 'Signout') {
      return React.cloneElement(child, {
        signout: context.signout,
      });
    } else if (child.type.name === 'RequireAuth' || child.type.name === 'CheckAuth') {
      return React.cloneElement(child, {
        authenticated: state.authenticated,
        username: state.username,
        searchTerm: state.term,
      });
    }
    return child;
  });
}

