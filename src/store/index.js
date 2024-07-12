import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routes: []
  },
  getters: {
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.routes = routes
    },
  },
  actions: {
    async generateRoutes({ commit }, actived) {
      return new Promise(async (resolve) => {
          const routes = [{
            path: '/pms/test-sub/subView',
            name: 'SubView',
            component: () => import('test-sub/src/views/SubView.vue')
          }]
          commit('SET_ROUTES', routes)
          resolve(routes)
      })
    }
  },
  modules: {
  }
})
