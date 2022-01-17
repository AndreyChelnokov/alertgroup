<template>
  <div v-if="apartmentList" class="apartment-list">
      <ApartmentItem v-for="(apartment, index) in apartmentList"
         :key="index"
         :apartment="apartment"
      />
  </div>
</template>

<script>
import ApartmentItem from './ApartmentItem.vue';

export default {
  name: 'ApartmentList',
  computed: {
    apartmentList() {
      return this.$store.state.apartmentList;
    },
  },
  components: {
    ApartmentItem,
  },
  mounted() {
    this.$store.dispatch('getApartmentList');
  },
};
</script>

<style>
  .apartment-list {
    display: flex;
    flex-wrap: wrap;
    background-color: #F8F8F8;
  }
</style>
