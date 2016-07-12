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

  sortVariations( ) {
    const { variations } = this.props;
    let total = 0;
    return variations.map( item => {
      total += ( item.percent / 100 ); // Lets convert percent to Math.random
      if ( total > 1 ) total = 1; // Cant get more than 100% !
      return {
        name: item.name || '',
        id: item.id || '',
        percent: total
      };
    }).sort( ( a, b ) => { // Right now we want highest first
      return a.percent < b.percent;
    });
  },

  getScript( ) {
    const { cookieName } = this.props;
    const variations = this.sortVariations( );
    let script = [ ];
    script.push( 'var cookies = document.cookie.split( \'; \');' );
    script.push( 'var cookieName = "' + cookieName + '";' );
    script.push( 'var variation = false;' );
    script.push( 'var percent = Math.random( );' );
    variations.map( item => {
      if ( !item.percent ) return;
      script.push( 'if ( percent <= ' + item.percent + ' ) variation = "' + item.id + '";' );
    });
    script.push( cookieLogic );
    script.push( showVariation );
    return script.join( '' );
  },

  render( ) {
    return <script dangerouslySetInnerHTML={{ __html: this.getScript( ) }} />;
  }
});

module.exports = SplitTestScript;
