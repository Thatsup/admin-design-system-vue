<script>
import { icons, aliases } from "../../assets/icons/icons.js";

export default {
  name: "TadsIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    rotate: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: [String, Number],
      default: 24
    },
    solid: Boolean,
  },
  computed: {
    svgStyle() {
      return {
        transform: `rotate(${this.rotate}deg)`,
        width: this.size + 'px',
        height: this.size + 'px',
      };
    },
    svgPath() {
      if (this.name in icons) {
        return icons[this.name];
      }

      if (this.name in aliases) {
        return icons[aliases[this.name]];
      }

      return ''
    }
  }
};
</script>

<template>
  <span
    class="icon"
    :class="{ solid: solid }"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <svg v-bind="$attrs" viewBox="0 0 24 24" :style="svgStyle" v-html="svgPath">
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
  padding: 6px;
}
</style>
