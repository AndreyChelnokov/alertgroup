import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apartmentList: [],
    filters: {},
  },
  mutations: {
    SET_APARTMENTS_LIST(state, value) {
      state.apartmentList = value;
    },
    SET_CURRENT_FILTERS(state, value) {
      state.filters = value;
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
  getters: {
    getListApartment(state) {
      let { apartmentList } = state;
      const { filters } = state;

      if (filters.floor) {
        if (filters.floor.max) {
          apartmentList = apartmentList.filter((apartment) => apartment.floor <= filters.floor.max);
        }
        if (filters.floor.min) {
          apartmentList = apartmentList.filter((apartment) => apartment.floor >= filters.floor.min);
        }
      }

      if (filters.price) {
        if (filters.price.max) {
          apartmentList = apartmentList.filter((apartment) => apartment.price / 1000000 <= filters.price.max);
        }
        if (filters.price.min) {
          apartmentList = apartmentList.filter((apartment) => apartment.price / 1000000 >= filters.price.min);
        }
      }

      if (filters.square) {
        if (filters.square.max) {
          apartmentList = apartmentList.filter((apartment) => apartment.square <= filters.square.max);
        }
        if (filters.square.min) {
          apartmentList = apartmentList.filter((apartment) => apartment.square >= filters.square.min);
        }
      }

      if (filters.rooms && filters.rooms.length) {
        apartmentList = apartmentList.filter((apartment) => filters.rooms.indexOf(apartment.rooms) >= 0);
      }

      return apartmentList;
    },
    getListUniqueRooms(state) {
      const rooms = state.apartmentList.map((apartment) => apartment.rooms);
      const uniqueRooms = rooms.filter((e, i) => rooms.indexOf(e) === i);
      return uniqueRooms.map((roomName) => {
        return { name: roomName, isChecked: false };
      });
    },
    getMaxValueByParams: (state) => (params) => {
      if (state.apartmentList.length) {
        return Math.max(...state.apartmentList.map((apartment) => apartment[params]));
      }
    },
    getMinValueByParams: (state) => (params) => {
      return Math.min(...state.apartmentList.map((apartment) => apartment[params]));
    },
  },
});
