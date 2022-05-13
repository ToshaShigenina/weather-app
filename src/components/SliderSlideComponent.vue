<template>
  <div class="slide">
    <slot />
  </div>
</template>

<script>
export default {
  name: "SliderSlideComponent",
};
</script>

<style scoped>
.slide {
  flex-grow: 0;
  flex-shrink: 0;
  user-select: none;
}
</style>