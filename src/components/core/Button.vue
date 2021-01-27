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
    isLoading: Boolean
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
        ["is-" + this.type]: !!this.type,
        ["is-" + this.size]: !!this.size,
        "is-fullwidth": this.expanded,
        "is-rounded": this.rounded,
        "is-loading": this.isLoading,
        "is-small": this.$attrs.hasOwnProperty("small"),
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
