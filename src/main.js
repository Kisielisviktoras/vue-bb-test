// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import i18n from 'vue-i18n';
import locale from 'element-ui/lib/locale/lang/en'
import ElementUI from 'element-ui'

Vue.use(ElementUI, { locale })
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.use(i18n);
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
