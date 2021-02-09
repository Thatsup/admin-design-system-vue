<template>
  <component
    :is="is"
    class="button"
    :class="buttonClasses"
    v-bind="$attrs"
    v-on="listeners"
  >
    <i v-if="icon" class="icon" :class="'icon-' + icon"></i>

    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "TadsButton",
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    rounded: Boolean,
    expanded: Boolean,
    isLoading: Boolean,

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
    listeners(event) {
      return {
        ...this.$listeners,
        input: () => {
          this.$emit("input", event.target.value);
        }
      };
    },
    buttonClasses() {
      return {
        ["is-" + this.type]: !!this.type, // Deprecated. Use Colors props instead
        ["is-" + this.size]: !!this.size, // Deprecated. Use Sizes props instead
        "is-fullwidth": this.expanded,
        "is-rounded": this.rounded,
        "is-loading": this.isLoading,

        // Sizes
        "is-small": this.small,
        "is-large": this.large,

        // Colors
        "is-blue": this.blue,
        "is-green": this.green,
        "is-yellow": this.yellow,
        "is-navy": this.navy,
        "is-red": this.red,
      };
    },
    is() {
      return this.$attrs['href'] ? 'a' : 'button'
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/sass/components/button.scss";
</style>
