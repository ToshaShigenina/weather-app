<template>
    <svg>
        <use :xlink:href="path"></use>
    </svg>
</template>

<script>
export default {
  name: "svg-icon",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    path() {
      return require("@/assets/img/sprite.svg") + '#' + this.name;
    },
  },
};
</script>