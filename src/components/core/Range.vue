<template>
  <div class="base-range" :class="wrapperClasses">
    <input
      type="range"
      :value="computedValue || placeholder"
      :step="$attrs['step']"
      v-bind="$attrs"
      @input="computedValue = $event.target.value"
    />

    <TadsInput
      v-if="hasInput"
      v-model="computedValue"
      type="number"
      :max="$attrs['max']"
      :min="$attrs['min']"
      :step="$attrs['step']"
      :style="inputStyles"
      :placeholder="placeholder || '-'"
      class="ml-2"
    />
  </div>
</template>

<script>
import TadsInput from "./Input";

export default {
  name: "TadsRange",
  components: { TadsInput },
  inheritAttrs: false,
  props: {
    value: {
      type: Number,
      default: null
    },
    placeholder: {
      type: [Number,String],
      default: null
    },
    hasInput: {
      type: Boolean
    }
  },

  data() {
    return {
      newValue: this.value
    };
  },

  computed: {
    computedValue: {
        get() {
            return this.newValue
        },
        set(newVal) {
            let value = parseFloat(newVal);

            if (isNaN(value)) {
              value = null;
            }
            this.newValue = value
            this.$emit('input', value)
        }
    },
    wrapperClasses() {
      return {
        level: this.hasInput,
        "no-value": !this.newValue
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
  },
  watch: {
    value(newVal) {
        this.newValue = newVal;
    }
  }
};
</script>

<style scoped>
.base-range {
  padding-bottom: 7px;
}

input[type="range"] {
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
