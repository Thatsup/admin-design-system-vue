<template>
  <label
    ref="label"
    class="switch level"
    :class="[size, { 'is-disabled': disabled, 'is-expanded': expanded }]"
    :disabled="disabled"
    @keydown.prevent.enter="$refs.label.click"
    @mousedown="isMouseDown = true"
    @mouseup="isMouseDown = false"
    @mouseout="isMouseDown = false"
    @blur="isMouseDown = false"
  >
    <span class="control-label text-lg"><slot /></span>
    <input
      v-model="computedValue"
      type="checkbox"
      :disabled="disabled"
      :name="name"
      :required="required"
      :value="nativeValue"
      :true-value="trueValue"
      :false-value="falseValue"
      @click.stop
    />
    <span
      class="check"
      :class="[{ 'is-elastic': isMouseDown && !disabled }, type]"
    />
  </label>
</template>

<script>
export default {
  name: "TadSwitch",
  props: {
    value: {
      type: [String, Number, Boolean, Function, Object, Array, Symbol],
      default: false
    },
    nativeValue: {
      type: [String, Number, Boolean, Function, Object, Array, Symbol],
      default: false
    },
    disabled: Boolean,
    type: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: ""
    },
    required: Boolean,
    expanded: Boolean,
    trueValue: {
      type: [String, Number, Boolean, Function, Object, Array, Symbol],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean, Function, Object, Array, Symbol],
      default: false
    }
  },
  data() {
    return {
      newValue: this.value,
      isMouseDown: false
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        this.newValue = value;
        this.$emit("input", value);
      }
    }
  },
  watch: {
    /**
     * When v-model change, set internal value.
     */
    value(value) {
      this.newValue = value;
    }
  }
};
</script>

<style scoped>
.switch {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  -webkit-touch-callout: none;
  user-select: none;
}

.switch + .switch {
  margin-left: 0.5em;
}

.switch input[type="checkbox"] {
  position: absolute;
  left: 0;
  opacity: 0;
  outline: none;
  z-index: -1;
}

.switch input[type="checkbox"] + .check {
  display: flex;
  align-items: center;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 2.75em;
  height: 1.575em;
  padding: 0.2em;
  background: var(--blue-gray-500);
  border-radius: 1em;
  transition: background 150ms ease-out;
}

.switch input[type="checkbox"] + .check:before {
  content: "";
  display: block;
  border-radius: 1em;
  width: 1.175em;
  height: 1.175em;
  background: whitesmoke;
  box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1),
    0 3px 3px 0 rgba(0, 0, 0, 0.05);
  transition: transform 150ms ease-out, width 150ms ease-out;
  will-change: transform;
}

.switch input[type="checkbox"] + .check.is-elastic:before {
  width: 1.75em;
}

.switch input[type="checkbox"]:checked + .check {
  background: #30a6d8;
}

.switch input[type="checkbox"]:checked + .check:before {
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}

.switch input[type="checkbox"]:checked + .check.is-elastic:before {
  -webkit-transform: translate3d(36.36363636%, 0, 0);
  transform: translate3d(36.36363636%, 0, 0);
}

.switch input[type="checkbox"]:focus {
  outline: none;
}

.switch input[type="checkbox"]:focus + .check {
  -webkit-box-shadow: 0 0 0.5em rgba(206, 206, 206, 0.6);
  box-shadow: 0 0 0.5em rgba(206, 206, 206, 0.6);
}

.switch input[type="checkbox"]:focus:checked + .check {
  -webkit-box-shadow: 0 0 0.5em rgba(48, 166, 216, 0.8);
  box-shadow: 0 0 0.5em rgba(48, 166, 216, 0.8);
}

.switch .control-label {
  padding-right: 0.5em;
}

.switch:hover input[type="checkbox"] + .check {
  background: #c9d8de;
}

.switch:hover input[type="checkbox"]:checked + .check {
  background: rgba(48, 166, 216, 0.9);
}

.switch.is-small {
  border-radius: 3px;
  font-size: 0.75rem;
}

.switch.is-medium {
  font-size: 1.25rem;
}

.switch.is-large {
  font-size: 1.5rem;
}

.switch[disabled] .check {
  opacity: 0.5;
}

.switch.is-expanded {
  width: 100%;
}
</style>
