<template>
  <main v-if="apartmentList" class="apartment-list">
    <div class="container">
      <div class="apartment-list__list">
        <ApartmentItem v-for="(apartment, index) in apartmentList"
           :key="index"
           :className="'apartment-list__item'"
           :apartment="apartment"
        />
      </div>
    </div>
  </main>
</template>

<script>
import ApartmentItem from './ApartmentItem.vue';

export default {
  name: 'ApartmentList',
  computed: {
    apartmentList() {
      return this.$store.getters.getListApartment;
    },
  },
  components: {
    ApartmentItem,
  },
  updateListApartments() {

  },
  mounted() {
    this.$store.dispatch('getApartmentList');
  },
};
</script>

<style lang="scss">
  .apartment-list {
    &__list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }

    &__item {
      margin-top: 30px;

      &:not(:nth-child(4n)) {
        margin-right: 30px;
      }
    }
  }

  @media(max-width:1316px) {
    .apartment-list {
      &__item {
        &:not(:nth-child(4n)) {
          margin-right: initial;
        }

        &:not(:nth-child(3n)) {
          margin-right: 20px;
        }
      }
    }
  }

  @media(max-width:995px) {
    .apartment-list {
      &__item {
        &:not(:nth-child(3n)) {
          margin-right: initial;
        }

        &:not(:nth-child(2n)) {
          margin-right: 20px;
        }
      }
    }
  }

  @media(max-width:995px) {
    .apartment-list {
      &__item {
        margin: 0 10px !important;
        margin-bottom: 20px !important;
      }
    }
  }
</style>
