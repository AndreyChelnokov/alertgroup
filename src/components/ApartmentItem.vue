<template>
  <div v-if="apartment" class="apartment-item">
    <div class="apartment-item__header">
      <div class="apartment-item__header_left">{{ apartment.floor }} этаж</div>
      <div class="apartment-item__header_right">
        {{ apartment.rooms }} {{ sculptedRoomName }} - {{ apartment.square }}м<sup>2</sup>
      </div>
    </div>
    <div class="apartment-item__image-wrap image-wrap">
      <div class="image-wrap__number">№{{ apartment.number }}</div>
      <img :src="preview" alt="" class="apartment-item__image">
    </div>
    <div class="apartment-item__footer">
      <div class="apartment-item__price">{{ price }}р.</div>
      <div class="apartment-item__price-square-meter">
        {{ pricePerSquareMeter }} р. за м <sup>2</sup>
      </div>
      <AlertgroupButton :class-mode="'apartment-item__button'" :content="'Подробнее'" />
    </div>
  </div>
</template>

<script>
import previewImage from '../assets/img/9eeb90d9c7aeeed41fb41c0b5e383013.jpg'
import { declOfNum } from '../utils';
import AlertgroupButton from './AlertgroupButton.vue';

export default {
  name: 'ApartmentItem',
  props: {
    apartment: Object,
  },
  computed: {
    preview() { return previewImage; },
    price() {
      return new Intl.NumberFormat().format(this.apartment.price);
    },
    pricePerSquareMeter() {
      const priceSquare = Math.floor(this.apartment.price / this.apartment.square);
      return new Intl.NumberFormat().format(priceSquare);
    },
    sculptedRoomName() {
      return declOfNum(this.apartment.rooms, ['комната', 'комнаты', 'комнат']);
    }
  },
  components: {
    AlertgroupButton,
  },
};
</script>

<style lang="scss">
  .apartment-item {
    max-width: 270px;
    width: 100%;
    box-shadow: 0px 5px 20px rgba(86, 86, 86, 0.05);
    border-radius: 10px;
    padding: 0 15px;
    margin-top: 30px;
    background-color: #fff;

    overflow: hidden;

    max-height: 365px;
    display: flex;
    flex-direction: column;

    &:not(:nth-child(4n)) {
      margin-right: 30px;
    }

    &.active,
    &:hover {
      .apartment-item__image-wrap{
        padding: 24px 0;

        & .apartment-item__image {
          max-height: 158px;
          transition: .5s;
        }
      }
      .apartment-item__button {
        height: 40px;
        opacity: 1;
        transition: opacity .5s;
      }
    }

    &__button {
      width: 100%;
      height: 40px;

      font-weight: 700;

      margin-top: 10px;

      cursor: pointer;

      opacity: 0;
      transition: opacity .5s;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      height: 100%;
      max-height: 40px;
      min-height: 40px;

      font-size: 12px;
      font-weight: 700;

      &_left {
        opacity: .5;
      }
    }

    &__image-wrap {
      position: relative;
    }

    &__image {
      max-height: 190px;
      transition: .5s;
    }

    &__footer {
      padding: 10px 0;
      text-align: right;
      font-weight: 700;
    }

    &__price {
      font-size: 20px;
      line-height: 28px;
    }

    &__price-square-meter {
      font-size: 12px;
      opacity: 0.5;
    }
  }

  .image-wrap {
    padding: 31px 0;
    border: 1px solid #EBEBEB;
    border-radius: 5px;

    &__number {
      position: absolute;
      right: 0;
      top: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 14px;
      font-weight: 700;

      width: 62px;
      height: 30px;
      border-radius: 0px 5px;

      border: 1px solid #EBEBEB;

      border-top: none;
      border-right: none;

      background-color: #fff;
    }
  }
</style>
