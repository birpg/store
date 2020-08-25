import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  // 是否认证通过
  set_authenticated: 'set_authenticated',
  // 用户信息
  set_user: 'set_user',
}
// 需要维护的状态
const state = {
  // 是否认证
  isAuthenticated: false,
  // 存储用户信息
  user: {},
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user,
}

const mutations = {
  [types.set_authenticated](state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated
    else state.isAuthenticated = false
  },
  [types.set_user](state, user) {
    if (user) state.user = user
    else state.user = {}
  },
}

const actions = {
  setIsAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.set_authenticated, isAuthenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.set_user, user)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.set_authenticated, false)
    commit(types.set_user, null)
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
