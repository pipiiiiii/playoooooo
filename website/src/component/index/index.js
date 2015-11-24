var Vue = require('vue');
var Tree = require('../tree/tree.vue');
require('./index.css')

new Vue({
  el: 'body',
  components: {
    tree: Tree
  }
})
