<script>
import { icons } from "../../icons";

export default {
  name: "TadsIcon",
  props: {
    name: {
      type: String,
      default: null
    },
    rotate: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: "24",
      validator(value) {
        return ["14", "18", "24"].indexOf(value) > -1;
      }
    }
  },
  computed: {
    style() {
      return {
        transform: `rotate(${this.rotate}deg)`
      }
    }
  },
  data() {
    return { icons };
  }
};
</script>

<template>
  <svg
    v-bind="$attrs"
    :class="'size-' + size"
    class="icon"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    :style="style"
  >
    <path :d="icons[name]" />
  </svg>
</template>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);
  fill: currentColor;
}

.icon path {
  fill: currentcolor;
}
</style>
