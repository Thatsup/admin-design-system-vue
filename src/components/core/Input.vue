<template>
  <input
    class="input"
    :class="{
      'is-loading': loading,
      'has-error': hasError,
      'has-border': $attrs.hasOwnProperty('border'),
      'is-large': $attrs.hasOwnProperty('large'),
      'is-narrow': isNarrow,
      transparent: $attrs.hasOwnProperty('transparent')
    }"
    :type="$attrs.type || 'text'"
    ref="input"
    :value="computedValue"
    v-bind="$attrs"
    @input="onInput"
    @blur="onBlur"
    @focus="onFocus"
  />
</template>

<script>
import FormElementMixin from "../utils/FormElementMixin";
// Input
export default {
  name: "TadsInput",
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    loading: Boolean,
    isNarrow: Boolean
  },
  data() {
    return {
      newValue: this.value,
      hasError: false
    };
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Set internal value.
     */
    value(value) {
      this.newValue = value;
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        this.newValue = value;
        this.$emit("input", value);
      }
    }
  },
  methods: {
    /**
     * Input's 'input' event listener, 'nextTick' is used to prevent event firing
     * before ui update, helps when using masks (Cleavejs and potentially others).
     */
    onInput(event) {
      this.$nextTick(() => {
        if (event.target) {
          this.computedValue = event.target.value;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/sass/components/input.scss";
</style>
