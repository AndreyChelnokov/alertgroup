<template>
  <div class="filters-bar__item filters-item" :class="className">
    <div class="filter-item__content-wrap">
      <div class="filters-bar__item-title filters-item__title">
        <slot name="title"></slot>
      </div>
      <div class="filters-item__content">
        <slot></slot>
      </div>
    </div>
    <div class="filters-item-between"></div>
  </div>
</template>

<script>
export default {
  name: 'FiltersItemWrap',
  props: {
    title: {
      type: String,
    },
    className: {
      type: String,
    },
  },
};
</script>

<style lang="scss">

.filters-item {
  display: flex;
  flex-grow: 1;

  &-between {
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


</style>
