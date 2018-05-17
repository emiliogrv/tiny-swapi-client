import axios from 'axios'

import helpers from '../assets/js/helpers'

axios.interceptors.response.use(
  response => {
    // Do something with response data
    return response
  },
  error => {
    helpers.errors(error)

    return Promise.reject(error)
  }
)

export default class ApiRestClass {
  constructor(endpoint) {
    this.endpoint = `https://swapi.co/api/${endpoint}`
  }

  all(params = {}) {
    return this.show(null, params)
  }

  show(id = null, params = {}) {
    helpers.remove_alerts()
    params = {
      ...params,
      format: 'json'
    }

    return new Promise((resolve, reject) => {
      const show = id ? `/${id}` : ''

      axios
        .get(`${this.endpoint}${show}`, { params })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
