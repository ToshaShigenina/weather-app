<template>
  <app-tabs-item :data="daily" />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import AppTabsItem from "./AppTabsItem.vue";

export default {
  name: "TabDaily",
  components: {
    AppTabsItem,
  },
  setup() {
    const store = useStore();
    const daily = computed(() => store.state.daily);
    return {
      daily,
    };
  },
};
</script>