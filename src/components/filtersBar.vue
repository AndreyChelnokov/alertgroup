<template>
  <div class="filters-bar">

    <div class="filters-bar__checkbox-list filters-bar__item rooms">
      <div class="filters-bar__item-title">КОМНАТЫ</div>
      <div class="filters-bar__item__content">

        <label v-for="room in rooms.uniqueList" :key="room.name">
          <input type="checkbox" v-model="room.isChecked" name="room" :value="room.name">
          {{ room.name }}
        </label>

      </div>
    </div>

    <FiltersItemField v-if="maxFloor" :max="maxFloor" :min="minFloor" :title="'ЭТАЖ'" :class-name="'floor'" />

    <FiltersItemField v-if="maxSquare" :max="maxSquare" :min="minSquare" :title="'ПЛОЩАДЬ, м<sup>2</sup>'" :class-name="'square'" />

    <FiltersItemField v-if="maxPrice" :max="maxPrice" :min="minPrice" :title="'СТОИМОСТЬ, млн. р.'" :class-name="'price'" />

    <AlertgroupButton :class-mode="'filters-bar__button'" :content="'Фильтровать'" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AlertgroupButton from './AlertgroupButton.vue';
import FiltersItemField from './FiltersItemFeild.vue';

export default {
  name: 'filtersBar',
  data() {
    return {
      rooms: {
        uniqueList: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      variantsRooms: 'getListUniqueRooms',
    }),

    maxFloor() {
      return this.$store.getters.getMaxValueByParams('floor');
    },
    minFloor() {
      return this.$store.getters.getMinValueByParams('floor');
    },
    maxSquare() {
      return this.$store.getters.getMaxValueByParams('square');
    },
    minSquare() {
      return this.$store.getters.getMinValueByParams('square');
    },
    maxPrice() {
      return this.$store.getters.getMaxValueByParams('price');
    },
    minPrice() {
      return this.$store.getters.getMinValueByParams('price');
    },
  },
  components: {
    AlertgroupButton,
    FiltersItemField,
  },
  watch: {
    variantsRooms(value) {
      this.rooms.uniqueList = value;
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
  .filters-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    &__item-title {
      font-size: 12px;
      color: #2C323A;
      font-weight: 700;
      text-align: left;
      margin-bottom: 8px;
    }
  }
</style>
