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
    small: Boolean,
    large: Boolean,
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
        "is-small": this.small,
        "is-large": this.large,
        "is-expanded": this.expanded,
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

<style scoped lang="scss">
@import "../../assets/sass/components/select.scss";
</style>
