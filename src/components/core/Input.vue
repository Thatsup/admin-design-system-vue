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
  name: "TInput",
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

<style scoped>
input {
  align-items: center;
  border: 1px solid transparent;
  border-radius: var(--radius);
  color: var(--navy-700);
  box-shadow: none;
  display: inline-flex;
  font-size: 18px;
  font-family: inherit;
  justify-content: flex-start;
  line-height: 1.5;
  width: 100%;
  padding: 8px 15px;
  position: relative;
  vertical-align: top;
}

input[readonly] {
  color: var(--gray-700);
}

.has-error {
  border: 1px solid var(--red-600);
}

.has-border {
  border: 1px solid #e0e7ea;
  border-radius: 6px;
}

.is-narrow {
  width: auto;
}

.is-large {
  padding: 12px 18px;
}

input::placeholder {
  color: var(--blue-gray-500);
  font-style: italic;
}

input[type="number"].transparent::-webkit-inner-spin-button,
input[type="number"].transparent::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"].transparent {
  background: transparent;
  -webkit-appearance: none;
  border: 0;
  outline: 0;
  padding: 0 5px;
  height: auto;
  text-align: right;
}
</style>
