<template>
  <input
    class="input"
    :class="{
      'has-error': hasError,
      'has-border': border,
      'input--large': large,
      'input--small': small,
      'input--full-width': expanded,
      'transparent': transparent
    }"
    type="text"
    ref="input"
    v-model="localValue"
  />
</template>

<script>
import "./input.css";
import {computed} from "vue";

export default {
  name: "TadsInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    border: Boolean,
    transparent: Boolean,
    small: Boolean,
    large: Boolean,
    hasError: Boolean,
    expanded: {
      type: Boolean,
      default: true
    },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const localValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        context.emit('update:modelValue', value)
      }
    });
    return {
      localValue
    };
  }
};
</script>
