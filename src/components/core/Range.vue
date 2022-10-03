<template>
  <div class="base-range" :class="wrapperClasses">
    <input
      type="range"
      v-model="localValue"
      v-bind="$attrs"
    />

    <TadsInput
      v-if="withInput"
      v-model="localValue"
      type="number"
      :max="$attrs['max']"
      :min="$attrs['min']"
      :step="$attrs['step']"
      :style="inputStyles"
      :placeholder="placeholder || '-'"
      class="ml-2"
      :small="small"
      :large="large"
    />
  </div>
</template>

<script>
import TadsInput from "./Input.vue";
import {computed} from "vue";

export default {
  name: "TadsRange",
  inheritAttrs: false,
  components: { TadsInput },
  props: {
    modelValue: {
      type: Number,
      default: null
    },
    placeholder: {
      type: [Number, String],
      default: null
    },
    small: Boolean,
    large: Boolean,
    withInput: Boolean
  },

  emits: ['update:modelValue'],
  setup(props, context) {
    const localValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        value = parseFloat(value);

        if (isNaN(value)) {
          value = null;
        }

        context.emit('update:modelValue', value)
      }
    });
    return {
      localValue
    };
  },

  data() {
    return {
      newValue: this.value
    };
  },

  computed: {
    wrapperClasses() {
      return {
        "has-input": this.withInput,
        "no-value": this.newValue === null
      };
    },
    inputStyles() {
      const widthVal =
        this.$attrs["max"] && this.$attrs["max"].toString().length > 3
          ? "95px"
          : "80px";

      return {
        // Set width of number input depending on range max value
        width: widthVal
      };
    }
  }
};
</script>

<style scoped>
.base-range {
  padding-bottom: 7px;
}

.base-range.has-input {
  display: flex;
  align-items: center;
}

.base-range.has-input input[type="range"] {
  margin-right: 1rem;
}

input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 2px;
  background: var(--gray-400);
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--navy-700);
  cursor: pointer;
  border-radius: 100px;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--navy-700);
  cursor: pointer;
  border-radius: 100px;
}

.no-value input[type="range"]::-webkit-slider-thumb {
  background: var(--gray-600);
}

.no-value input[type="range"]::-moz-range-thumb {
  background: var(--gray-600);
}
</style>
