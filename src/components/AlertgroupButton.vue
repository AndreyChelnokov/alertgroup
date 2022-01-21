<template>
  <button :type="typeButton" class="button" :class="classMode">{{ content }}</button>
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
    typeButton: {
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
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;

    &:hover {
      background-color: #65bd46;
    }
  }
</style>
