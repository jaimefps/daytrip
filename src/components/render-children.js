import React from 'react';

export default function renderChildren(props, state, context) {
  return React.Children.map(props.children, child => {
    if (child.type.name === 'Signup') {
      return React.cloneElement(child, {
        signup: context.signup,
      })
    } else {
      return child;
    }
  })
}

