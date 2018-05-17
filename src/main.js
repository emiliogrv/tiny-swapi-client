import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import store from './store'
import App from './App.vue'

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
