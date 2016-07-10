const React = require( 'react' );
const SplitTestScript = require( './splitTestScript' );
const Variation = require( './variation' );
const cookie = require( 'react-cookie' );

const { string } = React.PropTypes;

const Experiment = React.createClass({
  propTypes: {
    cookieName: string
  },

  getDefaultProps( ) {
    return {
      cookieName: 'variation'
    };
  },

  getInitialState( ) {
    return {
      variation: false,
      variations: null
    };
  },

  getVariations( ) {
    return React.Children.map( this.props.children,
      child => {
        return child.props;
      }
    );
  },

  getOriginal( ) {
    const { variations } = this.state;
    return variations.reduce( ( total, item ) => {
      if ( item.id && this.convert( item.id ) === 'original' ) return item;
      if ( !item.percent ) return item;
    }, [ ]);
  },

  getVariation( ) {
    const { variations, variation } = this.state;
    let winner = this.getOriginal( );
    variations.reduce( ( total, item ) => {
      if ( this.convert( item.id ) === this.convert( variation )) winner = item;
    }, [ ]);
    return winner;
  },

  convert( str ) {
    if ( !str ) return;
    return str.toString( ).toLowerCase( );
  },

  componentDidMount( ) {
    var htmlTag = document.getElementsByTagName( 'html' )[0];
    if ( htmlTag ) htmlTag.style.visibility = 'visible';
  },

  componentWillMount( ) {
    const { cookieName } = this.props;
    this.state.variation = cookie.load( cookieName );
    this.state.variations = this.getVariations( );
  },

  getWinner( ) {
    const { variation, variations } = this.state;
    if ( !variation || variation === 'false' ) return this.getOriginal( );
    return this.getVariation( );
  },

  render( ) {
    const { cookieName } = this.props;
    const winner = this.getWinner( );
    if ( !winner || !winner.children ) {
      throw( 'ERROR: Experiments had no Variations in it.' ); // No variations? Somethign went wrong
      return null;
    }

    return (
      <div>
        <SplitTestScript cookieName={ cookieName } variations={ this.state.variations } />
        <Variation children={ winner.children } />
      </div>
    );
  }
});

module.exports = Experiment;
