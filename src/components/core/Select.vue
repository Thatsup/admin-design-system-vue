<template>
  <span class="select" :class="fieldClasses">
    <span class="label" v-if="label">
      {{ label }}
    </span>

    <select
      :dir="transparent ? 'rtl' : 'ltr'"
      v-model="computedValue"
      v-bind="$attrs"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    >
      <template v-if="placeholder">
        <option :value="null" selected disabled hidden>
          {{ placeholder }}
        </option>
      </template>

      <slot></slot>
    </select>
  </span>
</template>

<script>
export default {
  name: "TadSelect",
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Boolean],
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
    transparent: Boolean
  },
  data() {
    return {
      selected: this.value
    };
  },

  watch: {
    value(value) {
      this.selected = value;
    }
  },

  computed: {
    computedValue: {
      get() {
        return this.selected;
      },
      set(value) {
        this.selected = value;
        this.$emit("input", value);
      }
    },

    fieldClasses() {
      return {
        "is-small": this.$attrs.hasOwnProperty("small"),
        "is-expanded": this.$attrs.hasOwnProperty("expanded"),
        "is-large": this.$attrs.hasOwnProperty("large"),
        "is-transparent": this.transparent,
        "has-border": this.$attrs.hasOwnProperty("border"),
        level: this.label
      };
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
  font-size: 18px;
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
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid var(--navy-700);
  border-radius: 2px;
  pointer-events: none;
}

.label {
  font-size: 18px;
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
  justify-content: space-between
}
</style>
