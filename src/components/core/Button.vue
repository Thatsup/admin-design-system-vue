<template>
  <div style="display: flex">
    <component
        :is="is"
        class="button"
        :class="buttonClasses"
        v-bind="$attrs"
    >
      <TadsIcon
          v-if="icon"
          :name="icon"
          :size="18"
          class="button__icon"
      />

      <span class="button__label">
        <slot v-if="!label"/>
        {{ label }}
      </span>
    </component>
  </div>
</template>

<script>
import "./button.css"
import TadsIcon from "./Icon";

export default {
  name: "TadsButton",
  inheritAttrs: false,
  components: {TadsIcon},
  props: {
    expanded: Boolean,
    isLoading: Boolean,
    isOutlined: Boolean,

    label: String,
    icon: String,

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
