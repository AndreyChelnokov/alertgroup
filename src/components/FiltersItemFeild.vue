<template>
  <div class="">
    <div class="filters-item__content-inputs">
      <input
        class="filters-item__input"
        :step="step" type="number"
        @input="updateKey"
        :min="min"
        :max="valueMaxField - step"
        v-model="valueMinField"
        name=""
      >
      <span class="filters-item__input-center"></span>
      <input
        class="filters-item__input"
        :step="step"
        type="number"
        @input="updateKey"
        :min="valueMinField + step"
        :max="max"
        v-model="valueMaxField"
        name=""
      >
    </div>

    <MultiRangeSlider
      :min="sliderMin"
      :max="sliderMax"
      :step="sliderStep"
      :ruler="false"
      :label="false"
      :minValue="this.float ? Number(valueMinField) * 10 : Number(valueMinField)"
      :maxValue="this.float ? Number(valueMaxField) * 10 : Number(valueMaxField)"
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
    float: { type: Boolean },
  },
  computed: {
    sliderStep() {
      return this.float ? this.step * 10 : this.step;
    },
    sliderMin() {
      return this.float ? this.min * 10 : this.min;
    },
    sliderMax() {
      return this.float ? this.max * 10 : this.max;
    },
  },
  methods: {
    updateKey() {
      this.barKey = this.valueMinField + this.valueMaxField;
    },

    updateValuesRange(e) {
      this.valueMinField = this.float ? e.minValue / 10 : e.minValue;
      this.valueMaxField = this.float ? e.maxValue / 10 : e.maxValue;
    },

    changeFields(value, mode) {
      this.emitChangeValue(value, mode);
    },

    emitChangeValue(value, mode) {
      this.$emit('changeValueField', { name: this.nameField, value, mode });
    },

    resetValue() {
      this.valueMaxField = this.max;
      this.valueMinField = this.min;

      this.barKey += '0';
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

        margin-bottom: 16px;
      }
    }
  }

  /* Убираю деволтные поведение input:number */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  /* Переопределяем стили input:range-slider */
  .multi-range-slider {
    all: initial !important;

    & .thumb-right::before{
      margin: -4px !important;
      transform: translateX(-10px);
    }
    & .thumb-left::before{
      margin: -12px !important;
    }
    & .thumb::before {
      border: 4px solid #fff !important;
      background-color: #70D24E !important;
      box-shadow: none !important;
      margin-top: -13px !important;
    }
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
  .bar-left {
    padding: 1px 0 !important;
  }
  .bar-left, .bar-right {
    border: none !important;
    box-shadow: none !important;
    background: #D8D8D8 !important;
  }

  @media(max-width:820px) {
    .filters-item__input {
      border: 1px solid #D8D8D8;
      border-radius: 5px;
      font-size: 13px;
      color: #2C323A;
      width: 60px;
      height: 30px;
      text-align: center;
    }
  }

  @media(max-width:676px) {
    .multi-range-slider {
      display: none !important;
    }
    .filters-item__content-inputs {
      margin-bottom: 0;
    }
  }
</style>
