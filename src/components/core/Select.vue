<template>
  <div class="select-wrap">
    <span class="select" :style="widthStyle" :class="fieldClasses">
      <span class="label" v-if="label">
        {{ label }}
      </span>

      <select
        ref="select"
        v-model="computedValue"
        v-bind="$attrs"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        :style="widthStyle"
        :required="required"
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
    <div class="dummy-wrap">
      <span class="select dummy" :class="fieldClasses" ref="dummySelect">
      <select>
        <option>{{ dummyText }}</option>
      </select>
    </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TadsSelect",
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Function],
      default: null
    },
    placeholder: {
      type: [String, Number, Boolean],
      default: ""
    },
    label: {
      type: [String, Number, Boolean],
      default: ""
    },
    transparent: Boolean,
    expanded: Boolean,
    autoWidth: Boolean,
    maxWidth: Number,
    required: Boolean
  },
  data() {
    return {
      selected: this.value,
      width: false,
      dummyText: null
    };
  },

  mounted() {
    this.calculateWidth()
  },

  watch: {
    value(value) {
      this.selected = value;

      this.$nextTick(() => {
        this.calculateWidth()
      })
    }
  },

  computed: {
    widthStyle() {
      if (this.expanded || (this.transparent && this.label)) {
        return {};
      }

      return { width: this.width + "px" };
    },
    computedValue: {
      get() {
        return this.selected;
      },
      set(value) {
        this.selected = value;
        this.calculateWidth()
        this.$emit("input", value);
      }
    },

    fieldClasses() {
      return {
        "is-small": this.$attrs.hasOwnProperty("small"),
        "is-expanded": this.expanded,
        "is-large": this.$attrs.hasOwnProperty("large"),
        "is-transparent": this.transparent,
        "has-border": this.$attrs.hasOwnProperty("border"),
        level: this.label
      };
    }
  },

  methods: {
    calculateWidth() {
      const select = this.$refs.select

      if (select.selectedIndex >= 0) {
        this.dummyText = select.options[select.selectedIndex].text
      } else {
        this.dummyText = this.placeholder
      }

      this.$nextTick(() => {
        this.width = this.calculateMaxWidth(this.$refs.dummySelect.offsetWidth)
      })
    },
    calculateMaxWidth(width) {
      if (!this.maxWidth) {
        return width
      }

      return width > this.maxWidth ? this.maxWidth : width
    }
  }
};
</script>

<style scoped>
.select {
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.select select {
  appearance: none;
  background-color: white;
  color: var(--navy-700);
  cursor: pointer;
  display: block;
  text-transform: inherit;
  outline: none;

  align-items: center;
  border: 1px solid transparent;
  border-radius: var(--radius);
  box-shadow: none;
  font-size: 16px;
  font-family: inherit;
  font-weight: 400;
  justify-content: flex-start;
  line-height: 1.5;
  padding: 8px 30px 8px 15px;
  position: relative;
  vertical-align: top;
}

.select::after {
  right: 0.425em;
  z-index: 4;
  content: " ";
  display: block;
  margin-top: -3px;
  position: absolute;
  top: 50%;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 7px solid var(--navy-700);
  border-radius: 1px;
  pointer-events: none;
}

.label {
  font-size: 16px;
}

.select.is-expanded,
.select.is-expanded select {
  width: 100%;
}

.select.is-transparent select {
  background: transparent;
  padding: 0 15px 0 0;
  height: auto;
}

.select.is-transparent::after {
  right: 0;
}

.select.is-small select {
  font-size: 16px;
  padding-right: 23px;
}

.select.is-small .label {
  font-size: 16px;
}

.select.has-border select {
  border: 1px solid #e0e7ea;
  border-radius: 6px;
}

.select.is-large select {
  padding: 12px 36px 12px 18px;
}

.select.is-large::after {
  right: 0.825em;
}

.select.level {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select select[disabled] {
  background: var(--gray-200);
  cursor: not-allowed;
}

.dummy-wrap {
  display: block;
  height: 0;
}

.dummy select {
  visibility: hidden !important;
  height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin: 0 !important;
  border-bottom: 0 !important;
  border-top: 0 !important;
}

.dummy::after,
.dummy::before {
  opacity: 0;
  visibility: hidden;
}
</style>
