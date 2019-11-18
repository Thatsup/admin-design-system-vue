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
    svgStyle() {
      return {
        transform: `rotate(${this.rotate}deg)`
      };
    }
  },
  data() {
    return { icons };
  }
};
</script>

<template>
  <span
    class="icon"
    :class="{ solid: solid }"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <svg
      v-bind="$attrs"
      viewBox="0 0 24 24"
      :style="svgStyle"
    >
      <path :d="icons[name]" />
    </svg>
  </span>
</template>

<style scoped>
.icon {
  display: inline-block;
}

.icon svg {
  vertical-align: middle;
  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);
  fill: currentColor;
  display: block;
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
