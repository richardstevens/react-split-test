# React Split Test

Install the package with `npm i --save react-split-test`

##### Usage
To use this plugin you will need to get the components from the plugin using react import/require.
```
const { Experiment, Variation } = require( 'react-split-test' );
```

To begin you will need to wrap all your variations in an `<Experiment>` tag.  
Variations then can sit within this using `<Variation />`.

```js
<Experiment>
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
```

If you wanted to add conditions to the split test then you can do this before the `<Experiment />` tag and the result from these conditions can be to alter the percent for each `<Variation percent={ textPercent } />`.

```js
let testPercent = ConditionA === true ? 50 : 33;
if ( !ConditionB ) testPercent = 0;

<Experiment>
  <Variation id="A" percent={ textPercent }>
    <div>Version A</div>
  </Variation>
  <Variation id="B" percent={ textPercent }>
    <div>Version B</div>
  </Variation>
  <Variation id="original">
    <div>Original Version</div>
  </Variation>
</Experiment>
```

### Config

##### Cookie to use
_`Default: 'variation'`_  
To use a custom cookie name for variations you can specify it inside the `<Experiment />` tag.

```js
<Experiment cookieName="customVariationCookie">
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
```

##### Tracking winners
_`Default: null`_  
To use a custom callback function for tracking winning variations you can specify it inside the `<Experiment />` tag.

```js
variationWinner( variation ) {
  if ( typeof ga === 'undefined' ) return;
  ga( 'send', 'variations', 'variation_hit:' + variation );
},
//...
render( ) {
//...
<Experiment cookieName="customVariationCookie" callBack={ this.variationWinner }>
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
```
