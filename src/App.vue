<template>
  <div class="wrapper">
    <sidebar-component />
    <div class="content">
      <forecast-component />
      <slider-component
        :slides-per-view="4"
        :between-slides="24"
        style="margin: 0 64px; width: 80%"
      >
        <slider-slide-component 
          v-for="(slide, i) in slides" 
          :key="i"
        >
          <card-component 
            :name="slide"
          />
        </slider-slide-component>
      </slider-component>
    </div>
  </div>
</template>

<script>
import SidebarComponent from "./components/SidebarComponent.vue";
import ForecastComponent from "./components/ForecastComponent.vue";
import CardComponent from "./components/CardComponent.vue";
import SliderComponent from "./components/SliderComponent.vue";
import SliderSlideComponent from "./components/SliderSlideComponent.vue";

export default {
  name: "App",
  components: {
    SidebarComponent,
    ForecastComponent,
    CardComponent,
    SliderComponent,
    SliderSlideComponent,
  },
  setup() {
    const slides = [
      "djdjd",
      "oiyioyioy",
      "edaa raad",
      "kif rd jos dio",
      "dfjikd ajfd fjdf sj",
      "kdfjkf",
    ];
    return { slides };
  },
  beforeCreate() {
    this.$store.dispatch('loadData');
  }
};
</script>
