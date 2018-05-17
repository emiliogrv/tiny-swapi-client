import Vue from 'vue'
import Vuex from 'vuex'

import handleHTTPErrors from '../assets/js/handle-HTTP-errors'

import people from './modules/people'
import species from './modules/species'

Vue.use(Vuex)

const state = {
  errors: []
}

const getters = {
  errors: state => state.errors
}

const mutations = {
  errors(state, errors) {
    state.errors = errors
  }
}

const actions = {
  errors({ commit }, errors) {
    if ((typeof errors === 'object' && errors.response) || typeof errors === 'string') {
      let catcher = {}

      if (typeof errors === 'string') {
        catcher.errors = [errors]
      }

      if (errors.response) {
        catcher = handleHTTPErrors(errors.response)
      }

      commit('errors', catcher.errors)
    }
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    people,
    species
  }
})
