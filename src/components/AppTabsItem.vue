<template>
  <app-slider 
    :slides-per-view="2" 
    :between-slides="24"
    :breackpoints="breackpoints"
    class="forecast__slider"
  >
    <app-slider-slide
      v-for="(item, i) in data"
      :key="i"
    >
      <base-card
        :name="item.date"
        size="sm"
        :show-loader="isLoad"
      >
        <img 
          v-if="item.icon"
          :src="item.icon" 
          :alt="item.date" 
          class="card__icon"
        >
        <div class="card__term">
          <span v-if="item.temp !== undefined">{{ item.temp }}°C</span>
          <span v-if="item.tempMax !== undefined">{{ item.tempMax }}°C</span>
          <span v-if="item.tempMin !== undefined">{{ item.tempMin }}°C</span>
        </div>
      </base-card>
    </app-slider-slide>
  </app-slider>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import BaseCard from "./BaseCard.vue";
import AppSlider from "./AppSlider.vue";
import AppSliderSlide from "./AppSliderSlide.vue";

export default {
  name: "AppTabsItem",
  components: {
    BaseCard,
    AppSlider,
    AppSliderSlide,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const store = useStore();
    const breackpoints = {
      912: {
        slidesPerView: 3
      },
      1024: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 5
      },
      1366: {
        slidesPerView: 6
      }
    }
    return {
      breackpoints,
      isLoad: computed(() => store.state.isLoad),
    };
  },
};
</script>

<style scoped>
.card__icon {
  width: 100%;
}

.card__term span+span {
  --color: var(--color-main-light);
  margin-left: 10px;
  color: var(--color);
}
</style>