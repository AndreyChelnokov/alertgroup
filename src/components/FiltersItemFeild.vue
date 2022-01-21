<template>
  <div class="">
    <div class="filters-item__content-inputs">
      <input
        class="filters-item__input"
        :step="step" type="number"
        @input="updateKey"
        :min="min"
        v-model="valueMinField"
        name=""
      >
      <span class="filters-item__input-center"></span>
      <input
        class="filters-item__input"
        :step="step"
        type="number"
        @input="updateKey"
        :max="max"
        v-model="valueMaxField"
        name=""
      >
    </div>
    <MultiRangeSlider
      :min="min"
      :max="max"
      :step="step"
      :ruler="false"
      :label="false"
      :minValue="Number(valueMinField)"
      :maxValue="Number(valueMaxField)"
      :key="barKey"
      @input="updateValuesRange"
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
    step: {
      type: Number,
    },
    nameField: {
      type: String,
    },
  },
  methods: {
    updateKey() {
      this.barKey = this.valueMinField + this.valueMaxField;
    },
    updateValuesRange(e) {
      this.valueMinField = e.minValue;
      this.valueMaxField = e.maxValue;
    },
    changeFields(value, mode) {
      this.$emit('changeValueField', { name: this.nameField, value, mode });
    },
  },
  components: { MultiRangeSlider },
  watch: {
    valueMinField(value) {
      this.changeFields(value, 'min');
    },
    valueMaxField(value) {
      this.changeFields(value, 'max');
    },
  },
};
</script>

<style lang="scss">
  .filters-item {
    &__input {
      border: 1px solid #D8D8D8;
      border-radius: 5px;

      font-size: 16px;
      color: #2C323A;

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

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  .filters-bar__item__content {
    margin-bottom: 10px;
  }
  .multi-range-slider {
    all: initial !important;
  }
  .thumb-right:before {
    transform: translateX(-10px);
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
    margin: -14px;
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
