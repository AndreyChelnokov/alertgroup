<template>
  <div v-if="rooms" class="filters-item__content-checkbox">
    <label v-for="room in rooms" :key="room.name" class="checkbox-item">
      <input
        class="checkbox-input"
        type="checkbox"
        v-model="room.isChecked"
        name="room"
        :value="room.name"
        @change="changeCheckbox"
      >
      <span class="checkbox-span">{{ room.name }}k</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'FiltersItemCheckbox',
  data() {
    return {
      rooms: [],
    };
  },
  props: {
    roomsList: {
      type: Array,
    },
  },
  methods: {
    changeCheckbox() {
      const list = this.rooms.filter((room) => room.isChecked).map((room) => room.name);
      this.$emit('updateRooms', { list });
    },
    resetValue() {
      this.rooms = this.rooms.map((room) => {
        room.isChecked = false;
        return room;
      });

      this.changeCheckbox();
    },
  },
  watch: {
    roomsList(newValue) {
      this.rooms = newValue;
    },
  },
};
</script>
