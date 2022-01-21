<template>
  <div id="app">

    <div class="wrap">
      <div class="wrap__content">
        <div class="container">
          <div class="wrap__title">Lorem ipsum dolor sit</div>
          <FiltersBar/>
          <ApartmentList/>
        </div>
      </div>
    </div>

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

body {
  background-color: #313131;
}

.container {
  max-width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
}

.wrap {
  max-height: 1760px;
  margin: 80px 80px;
  border-radius: 10px;
  padding: 30px;
  background-color: #fff;

  &__content {
    border-radius: 10px;
    background-color: #F8F8F8;
    padding-top: 51px;
  }

  &__title {
    font-size: 34px;
    font-weight: 500;
    text-transform: uppercase;
  }
}

#app {
  font-family: 'Gotham Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
