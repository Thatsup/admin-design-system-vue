<template>
  <component
    :is="is"
    class="button"
    :class="buttonClasses"
  >
    <slot />
  </component>
</template>

<script>
import "./button.css"
import TadsIcon from "./Icon";

export default {
  name: "TadsButton",
  components: {TadsIcon},
  props: {
    expanded: Boolean,
    isLoading: Boolean,
    isOutlined: Boolean,

    // Sizes
    small: Boolean,
    large: Boolean,

    // Colors
    blue: Boolean,
    green: Boolean,
    yellow: Boolean,
    navy: Boolean,
    red: Boolean
  },
  computed: {
    buttonClasses() {
      return {
        "is-fullwidth": this.expanded,
        "is-outlined": this.isOutlined,
        "is-loading": this.isLoading,

        // Sizes
        "is-small": this.small,
        "is-large": this.large,

        // Colors
        "color-blue": this.blue,
        "color-green": this.green,
        "color-yellow": this.yellow,
        "color-navy": this.navy,
        "color-red": this.red,
      };
    },
    is() {
      return this.$attrs['href'] ? 'a' : 'button'
    }
  }
};
</script>
