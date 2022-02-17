<template>
  <input
    class="input"
    :class="{
      'is-loading': loading,
      'has-error': hasError,
      'has-border': border,
      'input--large': large,
      'input--small': small,
      'is-narrow': isNarrow,
      transparent: transparent
    }"
    :type="$attrs.type || 'text'"
    ref="input"
    :value="computedValue"
    v-bind="$attrs"
    v-on="inputListeners"
  />
</template>

<script>
import FormElementMixin from "../utils/FormElementMixin";

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
    isNarrow: Boolean,
    border: Boolean,
    transparent: Boolean,
    small: Boolean,
    large: Boolean
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
    inputListeners: function() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function(event) {
          vm.$emit("input", event.target.value);
        }
      });
    },
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
