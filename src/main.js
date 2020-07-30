import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    setCount(state, count) {
      state.count = count
    }
  }
})

window.pippo = new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
