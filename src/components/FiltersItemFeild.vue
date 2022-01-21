<template>
  <div class="filters-bar__item filters-item" :class="className">
    <div class="filters-bar__item-title filters-item__title">{{ title }}</div>
    <div class="filters-item__content">
      <div class="filters-item__content-inputs">
        <input class="filters-item__input" type="number" @input="updateKey" :min="min" v-model="valueMinField" name="">
        <span class="filters-item__input-center"></span>
        <input class="filters-item__input" type="number" @input="updateKey" :max="max" v-model="valueMaxField" name="">
      </div>
    </div>
    <MultiRangeSlider
      :min="min"
      :max="max"
      :step="1"
      :ruler="false"
      :label="false"
      :minValue="Number(valueMinField)"
      :maxValue="Number(valueMaxField)"
      :key="barKey"
      @input="UpdateValues"
    />
  </div>
</template>

<script>
import MultiRangeSlider from 'multi-range-slider-vue';

export default {
  name: 'FiltersItemField',
  data() {
    return {
      barKey: 0,
      valueMinField: this.min,
      valueMaxField: this.max,
    };
  },
  props: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    title: {
      type: String,
    },
    className: {
      type: String,
    },
  },
  methods: {
    updateKey() {
      this.barKey = Number(this.valueMinField + this.valueMaxField);
    },
    UpdateValues(e) {
      this.valueMinField = e.minValue;
      this.valueMaxField = e.maxValue;
    },
  },
  components: { MultiRangeSlider },
};
</script>

<style lang="scss">
  .filters-item {
    &__input {
      border: 1px solid #D8D8D8;
      border-radius: 5px;

      width: 80px;
      height: 40px;

      text-align: center;

      &-center {
        display: block;
        height: 2px;
        width: 5px;
        background-color: #2C323A;
        opacity: .5;
        margin: 6px;
      }
    }

    &__content {
      &-inputs {
        display: flex;
        align-items: center;

        margin-bottom: 17px;
      }
    }
  }

  .filters-bar__item__content {
    margin-bottom: 10px;
  }
  .multi-range-slider {
    all: initial !important;
  }
  .bar {
    width: calc(100% - 24px);
    margin-left: 8px !important;
  }
  .min-value, .max-value {
    color: transparent !important;
    background: transparent !important;
    box-shadow: none !important;
  }
  .bar-inner {
    background-color: #70D24E !important;
    border: none !important;
    box-shadow: none !important;
  }
  .multi-range-slider .thumb::before {
    border: 4px solid #fff !important;
    background-color: #70D24E !important;
    box-shadow: none !important;
    margin-top: -13px !important;
  }
  .bar-left {
    padding: 1px 0 !important;
  }
  .bar-left, .bar-right {
    border: none !important;
    box-shadow: none !important;
    background: #D8D8D8 !important;
  }
</style>
