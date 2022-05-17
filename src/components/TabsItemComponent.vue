<template>
  <slider-component 
    :slides-per-view="4" 
    :between-slides="24"
  >
    <slider-slide-component 
      v-for="(item, i) in data" 
      :key="i"
    >
      <card-component :name="item.date || `${item.time}:00`">
        <img 
          :src="item.icon" 
          :alt="item.date" 
          class="card__icon"
        >
        <div class="card__term">
          <span v-if="item.temp !== undefined">{{ item.temp }}°C</span>
          <span v-if="item.tempMax !== undefined">{{ item.tempMax }}°C</span>
          <span v-if="item.tempMin !== undefined">{{ item.tempMin }}°C</span>
        </div>
      </card-component>
    </slider-slide-component>
  </slider-component>
</template>

<script>
import CardComponent from "./CardComponent.vue";
import SliderComponent from "./SliderComponent.vue";
import SliderSlideComponent from "./SliderSlideComponent.vue";

export default {
  name: 'ForecastDailyComponent',
  components: {
    CardComponent,
    SliderComponent,
    SliderSlideComponent,
  },
  props: {
    data: {
      type: Array,
      default: (() => [])
    }
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