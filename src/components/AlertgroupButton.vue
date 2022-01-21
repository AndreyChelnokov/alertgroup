<template>
  <button type="button" class="button" :class="classMode">{{ content }}</button>
</template>

<script>
export default {
  name: 'AlertgroupButton',
  props: {
    classMode: {
      type: String,
    },
    content: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
  .button {
    background-color: #70D24E;
    border-radius: 5px;
    border: none;
    outline: none;
    color: #fff;
    font-size: 14px;
    text-transform: uppercase;

    &:hover {
      background-color: #65bd46;
    }
  }
</style>
