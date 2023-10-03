<template>
  <label
    ref="label"
    class="switch"
    :class="{ 'is-expanded': expanded }"
    @keydown.prevent.enter="$refs.label.click"
    @mousedown="isMouseDown = true"
    @mouseup="isMouseDown = false"
    @mouseout="isMouseDown = false"
    @blur="isMouseDown = false"
  >
    <span class="control-label" v-if="label || $slots.default">
      <slot>{{ label }}</slot>
    </span>
    <input
      v-model="localValue"
      type="checkbox"
      @click.stop
      v-bind="$attrs"
    />
    <span
      class="check"
      :class="{ 'is-elastic': isMouseDown }"
    />
  </label>
</template>

<script>
import "./switch.css"
import {computed, ref} from "vue";

export default {
  name: "TadsSwitch",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Boolean, Function, Object, Array, Symbol],
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    expanded: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const isMouseDown = ref(false)
    const localValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        context.emit('update:modelValue', value)
      }
    });
    return {
      localValue,
      isMouseDown
    };
  }
};
</script>
