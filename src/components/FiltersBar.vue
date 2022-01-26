<template>
  <section class="filters-bar">
    <div class="container">
      <div class="filters-bar__toggle">
        <div class="filters-bar__toggle-button-wrap" @click="toggleHiddenFilters">
          <AlertgroupButton
            content="Расширенный поиск"
            class-mode="filters-bar__toggle-button"
            type="button"
          />
        </div>
      </div>
    </div>
    <div class="container">
      <form v-if="hiddenFilters" @submit.prevent="sendFilter" class="filters-bar__form">

        <FiltersItemWrap :class-name="'rooms'">
          <template v-slot:title>КОМНАТЫ</template>
          <FiltersItemCheckbox
            ref="rooms"
            :rooms-list="rooms.uniqueList"
            @updateRooms="updateValueRooms"
          />
        </FiltersItemWrap>

        <FiltersItemWrap :class-name="'floor'">
          <template v-slot:title>ЭТАЖ</template>
          <FiltersItemField
            ref="floor"
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
            ref="square"
            v-if="maxSquare"
            :max="maxSquare"
            :min="minSquare"
            :step=".1"
            :float="true"
            :name-field="'square'"
            @changeValueField="updateValueFieldForm"
          />
        </FiltersItemWrap>

        <FiltersItemWrap :class-name="'price'">
          <template v-slot:title>СТОИМОСТЬ, млн. р.</template>
          <FiltersItemField
            ref="price"
            v-if="maxPrice"
            :max="maxPrice"
            :min="minPrice"
            :step=".1"
            :float="true"
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
          <button @click="resetFilters" class="filters-bar__reset">сбросить фильтр</button>
        </div>

      </form>
    </div>
  </section>

</template>

<script>
import { mapGetters } from 'vuex';
import { roundToTheTenthOfANumber } from '../utils';
import AlertgroupButton from './AlertgroupButton.vue';
import FiltersItemField from './FiltersItemFeild.vue';
import FiltersItemWrap from './FiltersItemWrap.vue';
import FiltersItemCheckbox from './FiltersItemCheckbox.vue';

export default {
  name: 'filtersBar',
  data() {
    return {
      hiddenFilters: true,
      rooms: {
        uniqueList: [],
      },
      formValue: {
        rooms: [],
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
    toggleHiddenFilters() {
      this.hiddenFilters = !this.hiddenFilters;
    },
    updateValueFieldForm(prop) {
      this.formValue[prop.name][prop.mode] = prop.value;
    },
    updateValueRooms(prop) {
      this.formValue.rooms = prop.list;
    },
    sendFilter() {
      this.$store.commit('SET_CURRENT_FILTERS', JSON.parse(JSON.stringify(this.formValue)));

      if (window.innerWidth <= 676) {
        this.hiddenFilters = false;
      }
    },
    resetFilters() {
      this.$refs.floor.resetValue();
      this.$refs.square.resetValue();
      this.$refs.price.resetValue();
      this.$refs.rooms.resetValue();

      this.$store.commit('SET_CURRENT_FILTERS', JSON.parse(JSON.stringify(this.formValue)));
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
    FiltersItemCheckbox,
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
  .filters-item {
    &__content-checkbox {
      display: flex;
    }
  }


  .filters-bar {
    margin-top: 72px;
    margin-bottom: 23px;

    &__toggle-button-wrap {
      display: none;
    }

    &__form {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

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

      cursor: pointer;

      padding: 0;
      border: 0;
      background: transparent;

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
      cursor: pointer;
    }
  }

  @media(max-width:1190px) {
    .filters-bar__form {
      flex-wrap: wrap;
      justify-content: center;

      max-width: 720px;
      margin: 0 auto;
    }
    .filters-item {
      width: 33%;
      justify-content: center;
      flex-grow: initial;

      margin-bottom: 20px;
    }
    .filters-item:nth-child(1) {
      order: 2;
    }
    //.filters-item:nth-child(4) .filters-item__between {
    //  display: none;
    //}
    .filters-item__between {
      display: none;
    }
    .filters-bar__result-buttons {
      order: 3;
    }
  }

  @media(max-width:820px) {
    .filters-bar {
      &__button {
        width: 170px;
        margin-top: 20px;
        font-size: 12px;
        height: 30px;
        cursor: pointer;
      }

      &__reset {
        margin-top: 9px;
      }
    }
  }

  @media(max-width:676px) {
    .filters-bar {
      position: relative;

      &__form {
        justify-content: flex-start;
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        position: absolute;
        z-index: 99;
        top: calc(100% + 20px);
        left: 10px;
        width: calc(100% - 20px);
        border: 1px solid #eee;
      }
    }

    .filters-item {
      justify-content: flex-start;
      width: auto;
      margin-right: 30px;
    }
    .filters-bar__toggle-button-wrap {
      display: block;
    }
    .filters-bar__toggle-button {
      height: 30px;
      padding: 0 30px;
    }
  }

  @media(max-width:510px) {
    .filters-bar {
      margin-top: 30px;
      margin-bottom: 20px;

      &__toggle-button {
        font-size: 12px;
      }
    }
  }
</style>
