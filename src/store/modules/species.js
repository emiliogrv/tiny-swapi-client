import ApiRestClass from '../../api/ApiRestClass'
const api = new ApiRestClass('species')

// initial state
const state = {
  all: []
}

// actions
const actions = {
  index({ commit, dispatch, state }, params = null) {
    let page = 1
    params = {
      page,
      ...params
    }

    if (params.page === 1) {
      state.all = []
    }

    return new Promise((resolve, reject) => {
      api
        .all(params)
        .then(response => {
          commit('all', response.data.results)

          if (!response.data.next) {
            resolve(state.all)
          } else {
            params.page++
            dispatch('index', params).then(data => resolve(data))
          }
        })
        .catch(error => reject(error))
    })
  }
}

// mutations
const mutations = {
  all(state, data) {
    state.all.push(...data)
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}
