<template>
  <div 
    class="card" 
    :class="{ _small: size === 'sm', _large: size === 'lg' }"
  >
    <transition name="fade">
      <base-loader v-if="showLoader" />
      <div 
        v-else 
        class="card__content"
      >
        <h3 class="card__name">
          {{ name }}
        </h3>
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import BaseLoader from "./BaseLoader.vue";

export default {
  name: "BaseCard",
  components: { BaseLoader },
  props: {
    showLoader: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  --color-bg: var(--color-white);
  position: relative;
  background-color: var(--color-bg);
  border-radius: 8px;
  padding: 16px 4px;
  box-shadow: var(--shadow);
  width: 100%;
  font-size: 14px;
  text-align: center;
  transition: opacity 0.5s;
}

.card__name {
  font-weight: 400;
  font-size: 14px;
  text-align: center;
}

.card._small {
  /* max-width: 110px; */
  min-height: 174px;
}

.card._large {
  padding: 20px 4px;
  border-radius: 10px;
  max-width: 320px;
  min-height: 137px;
}

.card._large .card__name {
  font-weight: 400;
  font-size: 18px;
}

.card .loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>