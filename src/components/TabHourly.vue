
<template>
  <app-tabs-item :data="hourly" />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import AppTabsItem from "./AppTabsItem.vue";

export default {
  name: 'TabHourly',
  components: {
    AppTabsItem,
  },
  setup() {
    const store = useStore();
    return {
      hourly: computed(() => store.state.hourly)
    }
  }
};
</script>