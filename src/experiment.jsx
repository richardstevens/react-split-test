'use strict';

const React = require( 'react' );
const SplitTestScript = require( './splitTestScript' );
const cookie = require( 'react-cookie' );

const { string, node, func } = React.PropTypes;

const Experiment = React.createClass({
  propTypes: {
    cookieName: string,
    children: node,
    callBack: func
  },

  getDefaultProps( ) {
    return {
      cookieName: 'variation'
    };
  },

  getInitialState( ) {
    return {
      variation: false
    };
  },

  getVariations( ) {
    return React.Children.map( this.props.children,
      child => {
        let parentProps = { };
        for( let key in this.props ) {
          if ( key !== 'children' ) parentProps[ key ] = this.props[ key ];
        }
        return React.cloneElement(child, parentProps);
      }
    );
  },

  getOriginal( ) {
    const variations = this.getVariations( );
    return variations.reduce( ( total, item ) => {
      if ( item.props && item.props.id && this.convert( item.props.id ) === 'original' ) return item;
      if ( !item.props.percent ) return item;
    }, [ ]);
  },

  getVariation( ) {
    const { variation } = this.state;
    const variations = this.getVariations( );
    let winner = this.getOriginal( );
    variations.reduce( ( total, item ) => {
      if ( this.convert( item.props.id ) === this.convert( variation )) winner = item;
    }, [ ]);
    return winner;
  },

  convert( str ) {
    if ( !str ) return '';
    return str.toString( ).toLowerCase( );
  },

  componentDidMount( ) {
    var htmlTag = document.getElementsByTagName( 'html' )[0];
    if ( htmlTag ) htmlTag.style.visibility = 'visible';
  },

  componentWillMount( ) {
    const { cookieName } = this.props;
    this.state.variation = cookie.load( cookieName );
  },

  getWinner( ) {
    const { variation } = this.state;
    if ( !variation || variation === 'false' ) return this.getOriginal( );
    return this.getVariation( );
  },

  render( ) {
    const { cookieName, callBack } = this.props;
    const winner = this.getWinner( );
    if ( !winner ) {
      throw ( 'ERROR: Experiments had no Variations in it.' ); // No variations? Somethign went wrong
    }
    if ( callBack instanceof Function ) callBack( winner.props.name || winner.props.id );

    return (
      <div>
        <SplitTestScript cookieName={ cookieName } variations={ this.getVariations( ) } />
        { winner }
      </div>
    );
  }
});

module.exports = Experiment;
