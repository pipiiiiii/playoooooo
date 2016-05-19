var Vue = require('vue');
var Login = require('./login.vue');

Vue.use(require('vue-resource'));
new Vue({
  el: 'body',
  components: {
    login: Login
  }
})