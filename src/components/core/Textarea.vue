<template>
  <textarea
    class="input"
    :class="{
      'has-error': hasError,
      'input--full-width': expanded,
    }"
    v-model="localValue"
    rows="1"
  />
</template>

<script>
import './input.css'
import {computed} from "vue";

export default {
  name: "TadsTextarea",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    expanded: {
      type: Boolean,
      default: true,
    },
    hasError: Boolean
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

