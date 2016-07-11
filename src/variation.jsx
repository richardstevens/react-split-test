'use strict';

const React = require( 'react' );
const { node } = React.PropTypes;

const Variation = React.createClass({
  propTypes: {
    children: node
  },

  render( ) {
    return this.props.children;
  }
});

module.exports = Variation;
