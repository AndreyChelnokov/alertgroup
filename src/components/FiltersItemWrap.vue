<template>
  <div class="filters-item" :class="className">
    <div class="filter-item__content-wrap">
      <div class="filters-item__title" :class="'filters-item__title_' + className">
        <slot name="title"></slot>
      </div>
      <div class="filters-item__content">
        <slot></slot>
      </div>
    </div>
    <div class="filters-item__between"></div>
  </div>
</template>

<script>
export default {
  name: 'FiltersItemWrap',
  props: {
    className: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
  .filters-item {
    display: flex;
    flex-grow: 1;

    &__title {
      font-size: 12px;
      color: #2C323A;
      font-weight: 700;
      text-align: left;
      display: block;
      margin-bottom: 8px;

      &_square {
        margin-top: -3px;
      }
    }

    &__content {
      margin-bottom: 10px;
    }

    &__between {
      flex-grow: 1;
      margin-top: 20px;
      max-height: 40px;
      position: relative;

      &:after {
        content: "";
        width: 1px;
        height: 20px;
        background: #EBEBEB;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  @media(max-width:676px) {
    .filters-item__content {
      margin-bottom: 0;
    }
  }
</style>
