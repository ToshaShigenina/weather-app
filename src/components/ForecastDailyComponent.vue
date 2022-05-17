<template>
  <tabs-item-component :data="daily" />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import TabsItemComponent from "./TabsItemComponent.vue";

export default {
  name: 'ForecastDailyComponent',
  components: {
    TabsItemComponent,
  },
  setup() {
    const store = useStore();
    return {
      daily: computed(() => store.state.daily)
    }
  }
};
</script>