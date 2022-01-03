<template>
  <div class="input-wrapper" :class="{
    'is-loading': isLoading,
    'input--full-width': expanded,
  }">
    <input
        class="input"
        :class="{
          'has-error': hasError,
          'has-border': border,
          'input--large': large,
          'input--small': small,
          'transparent': transparent
        }"
        type="text"
        ref="input"
        v-model="localValue"
        v-bind="$attrs"
    />
  </div>
</template>

<script>
import "./input.css";
import "../../assets/styles/loading.css"
import {computed} from "vue";

export default {
  name: "TadsInput",
  inheritAttrs: false,
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
    isLoading: Boolean,
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
