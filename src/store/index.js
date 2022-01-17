import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apartmentList: [],
  },
  mutations: {
    SET_APARTMENTS_LIST(state, value) {
      state.apartmentList = value;
      console.log('f', state.apartmentList);
    },
  },
  actions: {
    getApartmentList(context) {
      const url = 'http://localhost:8080/data.json';

      fetch(url) // todo Локальный адрес
        .then((res) => res.json())
        .then((res) => context.commit('SET_APARTMENTS_LIST', res));
    },
  },
  modules: {
  },
  getters: {
    apartmentList(state) {
      return state.apartmentList;
    },
  },
});
