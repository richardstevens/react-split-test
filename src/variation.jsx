const React = require( 'react' );

const Variation = React.createClass({
  render( ) {
    return this.props.children;
  }
});

module.exports = Variation;
