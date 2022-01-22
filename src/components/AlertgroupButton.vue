<template>
  <button :type="typeButton" class="button" :class="classMode">{{ content }}</button>
</template>

<script>
export default {
  name: 'AlertgroupButton',
  props: {
    classMode: {
      type: String,
      required: true,
    },
    content: {
      type: [String, HTMLElement],
      required: true,
    },
    typeButton: {
      type: String,
      default: 'button',
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
    cursor: pointer;

    &:hover {
      background-color: #65bd46;
    }
  }
</style>
