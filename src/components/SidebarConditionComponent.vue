<template>
  <div class="condition">
    <img
      v-if="current.icon"
      :src="current.icon"
      :alt="current.description"
      class="condition__icon icon"
    >
    <img
      v-else
      src="http://openweathermap.org/img/wn/04d@4x.png" 
      class="condition__icon icon"
    >

    <h1 class="condition__temp">
      {{ Math.floor(current.temp) }}&nbsp;<small>°C</small>
    </h1>
    <span class="condition__fallout">{{ current.description || 'jhgjhgf hgfjh jhgjh jhgjk jhbjh' }}</span>
    <span class="condition__feel">Ощущается как {{ Math.floor(current.feel) }}°C</span>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "SidebarConditionComponent",
  setup() {
    const store = useStore();
    return {
      current: computed(() => store.state.current),
    };
  },
};
</script>

<style scoped>
.condition {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.condition__icon {
  max-width: 200px;
  height: auto;
  margin: auto;
}

.condition__temp {
  font-size: 96px;
  text-align: center;
  font-weight: 900;
  line-height: 0.8;
}

.condition__temp small {
  font-weight: 700;
  font-size: 50%;
}

.condition__fallout {
  margin-top: 40px;
  padding: 0 30px;
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  line-height: 1;
}

.condition__fallout::first-letter {
  text-transform: uppercase;
}

.condition__feel {
  --color: var(--color-main-light);
  margin-top: 16px;
  text-align: center;
  color: var(--color);
}

</style>