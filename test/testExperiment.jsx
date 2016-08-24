'use strict';

const React = require( 'react' );
const Experiment = require( '../src/experiment.jsx' );
const Variation = require( '../src/variation.jsx' );

const TestExperiment = React.createClass({
  render( ) {
    return (
      <Experiment cookieName="customVariationCookie" experimentWrappingClass="foo-wrap" { ...this.props }>
        <Variation id="A" percent={ 33 }>
          <div>Version A</div>
        </Variation>
        <Variation id="B" percent={ 33 }>
          <div>Version B</div>
        </Variation>
        <Variation id="original">
          <div>Original Version</div>
        </Variation>
      </Experiment>
    );
  }
});

module.exports = TestExperiment;
