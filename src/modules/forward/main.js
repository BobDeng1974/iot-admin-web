import 'babel-polyfill';
import '../../styles/base.less';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);
// Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});