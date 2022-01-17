<template>
  <div id="app">

    <div class="main-title">Lorem ipsum dolor sit</div>

    <FiltersBar/>

    <ApartmentList/>

  </div>
</template>

<script>
import FiltersBar from './components/filtersBar.vue';
import ApartmentList from './components/ApartmentList.vue';

export default {
  name: 'App',
  components: {
    FiltersBar,
    ApartmentList,
  },
};
</script>

<style lang="scss">
@import "assets/fonts/stylesheet.css";

* {
  box-sizing: border-box;
}

#app {
  font-family: 'Gotham Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
