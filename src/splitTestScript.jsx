'use strict';

const React = require( 'react' );

const cookieLogic = `
  for( var i = 0; i < cookies.length; i++ ) {
    var cookie = cookies[i].split( '=' );
    if ( cookie[0] !== cookieName ) continue;
    variation = cookie[1];
  }
  document.cookie = cookieName + '=' + variation;
`;
const showVariation = `
  if ( variation && variation !== 'false' ) {
    var htmlTag = document.getElementsByTagName( 'html' )[0]
    if ( htmlTag ) htmlTag.style.visibility = 'hidden';
  }
`;

const { array, string } = React.PropTypes;
const SplitTestScript = React.createClass({
  propTypes: {
    variations: array.isRequired,
    cookieName: string.isRequired
  },

  getDefaultProps( ) {
    return {
      cookieName: 'variation'
    };
  },

  getScript( ) {
    const { cookieName, variations } = this.props;
    let script = [ ];
    const getCookieName = 'var cookies = document.cookie.split( \'; \');var cookieName = "' + cookieName + '";';
    script.push( 'var variation = false;' );
    script.push( 'var percent = Math.random( );' );
    const scriptLength = script.length;
    variations.map( item => {
      if ( !item.percent ) return;
      script.push( 'if ( percent < ' + item.percent + ' ) variation = "' + item.id + '";' );
    });
    if ( script.length === scriptLength ) {
      return;
    }
    script.push( cookieLogic );
    script.push( showVariation );
    return getCookieName + script.join( '' );
  },

  render( ) {
    const script = this.getScript( );
    if ( !script ) return null;
    return <script dangerouslySetInnerHTML={{ __html: script }} />;
  }
});

module.exports = SplitTestScript;
