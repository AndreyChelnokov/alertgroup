<template>
  <div id="app">

    <div class="wrap">
      <div class="wrap__content">
        <header>
          <div class="container">
            <h1 class="wrap__title">Lorem ipsum dolor sit</h1>
          </div>
        </header>
        <FiltersBar/>
        <ApartmentList/>
      </div>
    </div>

  </div>
</template>

<script>
import FiltersBar from './components/FiltersBar.vue';
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
  overflow: hidden;
}

.container {
  max-width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
}

.wrap {
  max-height: 100vh;
  border-radius: 10px;
  padding: 30px;
  background-color: #fff;

  &__content {
    border-radius: 10px;
    background-color: #F8F8F8;
    padding-top: 51px;
    padding-bottom: 100px;

    max-height: calc(100vh - 220px);
    overflow: scroll;
    box-sizing: border-box;
  }

  &__title {
    font-size: 34px;
    font-weight: 500;
    text-transform: uppercase;
    margin: 0;
  }
}

#app {
  font-family: 'Gotham Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 80px;
}

@media(max-width:1550px) {
  #app {
    padding: 30px;
  }
  .wrap {
    padding: 20px;

    &__content {
      padding-bottom: 50px;
      max-height: calc(100vh - 110px);
    }
  }
}
@media(max-width:676px) {
  .wrap__title {
    font-size: 27px;
  }
}
@media(max-width:510px) {
  #app {
    padding: 5px;
  }
  .wrap {
    padding: 5px;
  }
  .wrap__content {
    padding-bottom: 30px;
    max-height: calc(100vh - 30px);
  }
}
</style>
