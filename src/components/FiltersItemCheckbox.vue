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
      required: true,
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

    updateRoomsList() {
      this.rooms = this.roomsList;
    },
  },
  watch: {
    roomsList() {
      this.updateRoomsList();
    },
  },
  mounted() {
    this.updateRoomsList();
  },
};
</script>

<style lang="scss">
  .checkbox-item {
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 4px;
    }

    .checkbox-input {
      display: none;
      & + .checkbox-span {
        display: block;

        font-size: 16px;
        line-height: 40px;
        text-align: center;
        color: #2C323A;
        font-weight: 700;

        width: 47px;
        height: 40px;
        border: 1px solid #D8D8D8;
        border-radius: 5px;
      }

      &:checked {
        & + .checkbox-span {
          color: #fff;
          background-color: #70D24E;
          border-color: #70D24E;
        }
      }
    }
  }

  @media(max-width:820px) {
    .checkbox-item .checkbox-input + .checkbox-span {
      font-size: 12px;
      line-height: 30px;
      width: 35px;
      height: 30px;
    }
  }
</style>
