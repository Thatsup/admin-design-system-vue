<template>
  <label
    ref="label"
    class="base-checkbox checkbox"
    :class="{
        'no-value': localValue === null || localValue === '',
    }"
    @keydown.prevent.enter="$refs.label.click"
  >
    <input
      v-model="localValue"
      type="checkbox"
      v-bind="$attrs"
    />
    <span class="check" />
    <span class="control-label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
import './checkbox.css'
import {computed} from "vue";

export default {
  name: "TadsCheckbox",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Boolean, Function, Object, Array, Symbol],
      default: ""
    },
    label: {
      type: String,
      default: ""
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
