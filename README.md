# Toastr

semantic-ui-toastr component for Vue.


## Installation

```
$ npm install vue-semantic-ui-toastr --save
```


## Examples

```js
// main.js
import Vue from 'vue'
import Toastr from 'vue-semantic-ui-toastr'

Vue.use(Toastr, {
  duration: 3000,
  container: '.toastr-container',
  autoshow: true,
  html: false
})

// App.vue
this.$toastr
  .h('Header')
  .i('Message')
```


## Badges

![](https://img.shields.io/badge/license-MIT-blue.svg)
<!-- ![](https://img.shields.io/badge/status-stable-green.svg) -->
