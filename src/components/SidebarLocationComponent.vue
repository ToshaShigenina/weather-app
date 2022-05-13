<template>
  <div class="location">
    <svg-icon-component 
      name="point" 
      class="location__icon" 
    />
    <span>{{ city }}</span>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import SvgIconComponent from "./SvgIconComponent.vue";

export default {
  name: "SidebarLocationComponent",
  components: {
    SvgIconComponent,
  },
  setup() {
    const store = useStore();
    return {
      city: computed(() => store.state.city),
    };
  },
};
</script>

<style scoped>
.location {
  --color: var(--color-main-light);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--color);
}

.location__icon {
  width: 24px;
  height: 36px;
  margin-right: 16px;
}
</style>