'use strict';

const React = require( 'react' );
const { expect } = require( 'chai' ).use( require( 'dirty-chai' ));
const { mount } = require( 'enzyme' );
const { isElement } = require( 'react-addons-test-utils' );
const Variation = require( '../src/variation.jsx' );

describe( '<Variation />', ( ) => {
  it( 'is an element', ( ) => {
    expect( isElement( <Variation /> )).to.be.ok( );
  });
  it( 'contains children nodes', ( ) => {
    const component = mount( <Variation><span className="test">Foo</span></Variation> );
    expect( component.find( '.test' ).length ).to.equal( 1 );
    expect( component.find( '.test' ).text( ) ).to.equal( 'Foo' );
  });
});
