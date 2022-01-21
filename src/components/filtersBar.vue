<template>
  <form @submit.prevent="filter" class="filters-bar">

    <FiltersItemWrap :class-name="'rooms'">
      <template v-slot:title>
        КОМНАТЫ
      </template>
      <div class="filters-item__content-checkbox">
        <label v-for="room in rooms.uniqueList" :key="room.name" class="checkbox-item">
          <input
            class="checkbox-input"
            type="checkbox"
            v-model="room.isChecked"
            name="room"
            :value="room.name">
          <span class="checkbox-span">{{ room.name }}k</span>
        </label>
      </div>
    </FiltersItemWrap>

    <FiltersItemWrap :class-name="'floor'">
      <template v-slot:title>ЭТАЖ</template>
      <FiltersItemField
        v-if="maxFloor"
        :max="maxFloor"
        :min="minFloor"
        :step="1"
        :name-field="'floor'"
        @changeValueField="updateValueFieldForm"
      />
    </FiltersItemWrap>

    <FiltersItemWrap :class-name="'square'">
      <template v-slot:title>ПЛОЩАДЬ, м<sup>2</sup></template>
      <FiltersItemField
        v-if="maxSquare"
        :max="maxSquare"
        :min="minSquare"
        :step=".01"
        :name-field="'square'"
        @changeValueField="updateValueFieldForm"
      />
    </FiltersItemWrap>

    <FiltersItemWrap :class-name="'price'">
      <template v-slot:title>СТОИМОСТЬ, млн. р.</template>
      <FiltersItemField
        v-if="maxPrice"
        :max="maxPrice"
        :min="minPrice"
        :step=".01"
        :name-field="'price'"
        @changeValueField="updateValueFieldForm"
      />
    </FiltersItemWrap>

    <div class="filters-bar__result-buttons">
      <AlertgroupButton
        :typeButton="'submit'"
        :class-mode="'filters-bar__button'"
        :content="'Фильтровать'"
      />
      <div class="filters-bar__reset">сбросить фильтр</div>
    </div>

  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import roundToTheTenthOfANumber from '../utils';
import AlertgroupButton from './AlertgroupButton.vue';
import FiltersItemField from './FiltersItemFeild.vue';
import FiltersItemWrap from './FiltersItemWrap.vue';

export default {
  name: 'filtersBar',
  data() {
    return {
      rooms: {
        uniqueList: [],
      },
      formValue: {
        price: {
          min: '',
          max: '',
        },
        floor: {
          min: '',
          max: '',
        },
        square: {
          min: '',
          max: '',
        },
      },
    };
  },
  methods: {
    updateValueFieldForm(prop) {
      this.formValue[prop.name][prop.mode] = prop.value;
    },
    filter() {
      console.log('filter - submit');
    },
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
      return roundToTheTenthOfANumber(this.$store.getters.getMaxValueByParams('square'));
    },
    minSquare() {
      return roundToTheTenthOfANumber(this.$store.getters.getMinValueByParams('square'));
    },
    maxPrice() {
      const mln = this.$store.getters.getMaxValueByParams('price') / 1000000;
      return roundToTheTenthOfANumber(mln);
    },
    minPrice() {
      const mln = this.$store.getters.getMinValueByParams('price') / 1000000;
      return roundToTheTenthOfANumber(mln);
    },
  },
  components: {
    AlertgroupButton,
    FiltersItemField,
    FiltersItemWrap,
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
  .checkbox-item {
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 4px;
    }

    .checkbox-input {
      display: none;
      & + .checkbox-span {
        display: block;

        font-size: 16px;
        line-height: 40px;
        text-align: center;
        color: #2C323A;
        font-weight: 700;

        width: 47px;
        height: 40px;
        border: 1px solid #D8D8D8;
        border-radius: 5px;
      }

      &:checked {
        & + .checkbox-span {
          color: #fff;
          background-color: #70D24E;
          border-color: #70D24E;
        }
      }
    }
  }


  .filters-item {
    &__content-checkbox {
      display: flex;
    }
  }


  .filters-bar {
    margin-top: 72px;
    margin-bottom: 23px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    &__result-buttons {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &__reset {
      font-weight: 700;
      color: #2C323A;
      font-size: 10px;
      text-transform: uppercase;
      margin-top: 15px;
      position: relative;

      &:after {
        width: 100%;
        height: 2px;
        bottom: -3px;
        background: #70D24E;
        left: 0;
        content: "";
        position: absolute;
      }
    }

    &__button {
      width: 202px;
      margin-top: 20px;
      height: 40px;
    }

    &__item-title {
      font-size: 12px;
      color: #2C323A;
      font-weight: 700;
      text-align: left;
      margin-bottom: 2px;
      display: block;
      height: 18px;
    }
  }
</style>
