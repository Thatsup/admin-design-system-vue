<script>
import { icons } from "../../assets/icons/icons.js";

export default {
  name: "TadsIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    rotate: {
      type: [Number, String],
      default: null
    },
    size: {
      type: String,
      default: "24",
      validator(value) {
        return ["14", "18", "24"].indexOf(value) > -1;
      }
    },
    solid: Boolean
  },
  computed: {
    style() {
      return {
        transform: `rotate(${this.rotate}deg)`
      }
    },
    classes() {
      return {
        ["size-" + this.size]: this.size,
        solid: this.solid
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
    :class="classes"
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

.icon.solid {
  color: #fff;
  background: var(--navy-700);
  border-radius: 4px;
  padding: 5px;
}
</style>
