<template>
  <div class="select-wrap">
    <span class="select" :style="widthStyle" :class="fieldClasses">
      <span class="label" v-if="label">
        {{ label }}
      </span>

      <select
        ref="select"
        :dir="dir"
        :value="selected"
        @input="localValue = $event.target.value"
        v-bind="$attrs"
        :style="widthStyle"
      >
        <template v-if="placeholder">
          <option
            :hidden="required ? 'hidden' : false"
            :disabled="required ? 'disabled' : false"
            :value="null"
            selected
          >
            {{ placeholder }}
          </option>
        </template>

        <slot></slot>
      </select>
    </span>

    <!-- This is needed to measure the selected options text length to adjust the real select's width -->
    <div class="select__dummy-wrap">
      <span class="select select__dummy-wrap__dummy" :class="fieldClasses" ref="dummySelect">
      <select>
        <option>{{ dummyText }}</option>
      </select>
    </span>
    </div>
  </div>
</template>

<script>
import './select.css'
import {nextTick} from "vue";

export default {
  name: "TadsSelect",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Boolean, Object, Array, Function],
      default: null
    },
    placeholder: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    small: Boolean,
    large: Boolean,
    transparent: Boolean,
    expanded: Boolean,
    autoWidth: Boolean,
    autoWidthMax: Number,
    required: Boolean,
    border: Boolean,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      selected: this.modelValue,
      width: false,
      dummyText: null,
      dir: (this.label && this.transparent) ? 'rtl' : 'ltf'
    };
  },

  mounted() {
    this.calculateWidth()
  },

  watch: {
    modelValue(val) {
      this.selected = val
    }
  },

  computed: {
    widthStyle() {
      if (this.expanded || (this.transparent && this.label)) {
        return {};
      }

      return { width: this.width + "px" };
    },
    localValue: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
        this.selected = value
        this.calculateWidth()
      }
    },

    fieldClasses() {
      return {
        "is-small": this.small,
        "is-large": this.large,
        "is-expanded": this.expanded,
        "is-transparent": this.transparent,
        "has-border": this.border,
        "level": this.label,
      };
    }
  },

  methods: {
    calculateWidth() {
      if (!this.autoWidth) return

      const select = this.$refs.select

      if (select.selectedIndex >= 0) {
        this.dummyText = select.options[select.selectedIndex].text
      } else {
        this.dummyText = this.placeholder
      }

      nextTick(() => {
        this.width = this.calculateMaxWidth(this.$refs.dummySelect.offsetWidth)
      })
    },
    calculateMaxWidth(width) {
      if (!this.autoWidthMax) {
        return width
      }

      return width > this.autoWidthMax ? this.autoWidthMax : width
    }
  }
};
</script>
