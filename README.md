# React Split Test

Install the package with `npm i --save react-split-test`

##### Usage
To use this plugin you will need to get the components from the plugin using react import/require.
```
const { Experiement, Variation } = require( 'react-split-test' );
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
