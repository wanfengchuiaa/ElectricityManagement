import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('dianshangToken')
  },
  getters: {
  },
  mutations: {
    setUser (state, token) {
      state.user = token
    }
  },
  actions: {
  },
  modules: {
  }
})
