
<template>
  <tabs-item-component :data="hourly" />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import TabsItemComponent from "./TabsItemComponent.vue";

export default {
  name: 'ForecastHourlyComponent',
  components: {
    TabsItemComponent,
  },
  setup() {
    const store = useStore();
    return {
      hourly: computed(() => store.state.hourly)
    }
  }
};
</script>