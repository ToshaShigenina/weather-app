<template>
  <svg>
    <use :xlink:href="path" />
  </svg>
</template>

<script>
export default {
  name: "BaseSvgIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    path() {
      return require("@/assets/img/sprite.svg") + "#" + this.name;
    },
  },
};
</script>