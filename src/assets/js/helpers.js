import Vue from 'vue'

import store from '@/store'

Vue.mixin({
  beforeCreate() {
    const options = this.$options
    if (options._h) {
      this.$_h = typeof options._h === 'function' ? options._h() : options._h
    } else if (options.parent && options.parent.$_h) {
      this.$_h = options.parent.$_h
    }
  }
})

export default {
  errors(errors = []) {
    this.remove_alerts()
    store.dispatch('errors', errors)
  },

  remove_alerts() {
    store.commit('errors', [])
  }
}
