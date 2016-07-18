'use strict';

const React = require( 'react' );
const cookie = require( 'react-cookie' );
const { expect } = require( 'chai' ).use( require( 'dirty-chai' ));
const { mount } = require( 'enzyme' );
const { isElement } = require( 'react-addons-test-utils' );
const TestExperiment = require( './testExperiment.jsx' );
const Experiment = require( '../src/experiment.jsx' );

describe( '<Experiment />', ( ) => {
  let component;

  before( ( ) => {
    component = mount( <TestExperiment foo="bar" /> );
  });

  it( 'is an element', ( ) => {
    expect( isElement( <Experiment /> )).to.be.ok( );
  });
  it( 'shows original by default', ( ) => {
    expect( component.find( 'div' ).first( ).text( ) ).to.contains( 'Original Version' );
  });

  describe( 'Original', ( ) => {
    before( ( ) => {
      cookie.save( 'customVariationCookie', 'false' );
      component = mount( <TestExperiment /> );
    });

    it( 'shows original', ( ) => {
      expect( component.find( 'div' ).first( ).text( ) ).to.contains( 'Original Version' );
    });
  });

  describe( 'Variation A', ( ) => {
    before( ( ) => {
      cookie.save( 'customVariationCookie', 'A' );
      component = mount( <TestExperiment /> );
    });

    it( 'shows Variation B', ( ) => {
      expect( component.find( 'div' ).first( ).text( ) ).to.contains( 'Version A' );
    });
  });

  describe( 'Variation B', ( ) => {
    before( ( ) => {
      cookie.save( 'customVariationCookie', 'B' );
      component = mount( <TestExperiment /> );
    });

    it( 'shows Variation B', ( ) => {
      expect( component.find( 'div' ).first( ).text( ) ).to.contains( 'Version B' );
    });
  });

  describe( 'No Cookie', ( ) => {
    before( ( ) => {
      cookie.remove( 'customVariationCookie' );
      component = mount( <TestExperiment /> );
    });

    it( 'shows original', ( ) => {
      expect( component.find( 'div' ).first( ).text( ) ).to.contains( 'Original Version' );
    });
  });
});
