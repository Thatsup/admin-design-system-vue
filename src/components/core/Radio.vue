<template>
  <label
    ref="label"
    class="base-radio radio"
    :class="[size, { 'is-disabled': disabled }]"
    :disabled="disabled"
    @keydown.prevent.enter="$refs.label.click"
  >
    <input
      v-model="computedValue"
      :indeterminate.prop="indeterminate"
      type="radio"
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="nativeValue"
      :true-value="trueValue"
      :false-value="falseValue"
      @click.stop
    />
    <span class="check" :class="type" />
    <span class="control-label"><slot /></span>
  </label>
</template>

<script>
export default {
  name: "TadsRadio",
  props: {
    value: {
      type: [String, Number, Boolean, Function, Object, Array, Symbol],
      default: ""
    },
    nativeValue: {
      type: [String, Number, Boolean, Function, Object, Array, Symbol],
      default: ""
    },
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
    indeterminate: Boolean,
    disabled: Boolean,
    required: Boolean,
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
      newValue: this.value
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
.base-radio.radio {
  outline: none;
  display: inline-flex;
  align-items: center;
  user-select: none;
}

.base-radio.radio + .radio {
  margin-left: 0.5em;
}

.base-radio.radio input[type="radio"] {
  position: absolute;
  left: 0;
  opacity: 0;
  outline: none;
  z-index: -1;
}

.base-radio.radio input[type="radio"] + .check {
  width: 1.25em;
  height: 1.25em;
  flex-shrink: 0;
  border-radius: 6px;
  border: 2px solid #cecece;
  -webkit-transition: background 150ms ease-out;
  transition: background 150ms ease-out;
}

.base-radio.radio input[type="radio"]:checked + .check {
  background: #30a6d8
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath style='fill:%23fff' d='M 0.04038059,0.6267767 0.14644661,0.52071068 0.42928932,0.80355339 0.3232233,0.90961941 z M 0.21715729,0.80355339 0.85355339,0.16715729 0.95961941,0.2732233 0.3232233,0.90961941 z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat center center;
  border-color: #30a6d8;
}

.base-radio.radio input[type="radio"]:indeterminate + .check {
  background: #30a6d8
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect style='fill:%23fff' width='0.7' height='0.2' x='.15' y='.4'%3E%3C/rect%3E%3C/svg%3E")
    no-repeat center center;
  border-color: #30a6d8;
}

.base-radio.radio input[type="radio"]:focus + .check {
  -webkit-box-shadow: 0 0 0.5em rgba(206, 206, 206, 0.8);
  box-shadow: 0 0 0.5em rgba(206, 206, 206, 0.8);
}

.base-radio.radio input[type="radio"]:focus:checked + .check {
  -webkit-box-shadow: 0 0 0.5em rgba(48, 166, 216, 0.8);
  box-shadow: 0 0 0.5em rgba(48, 166, 216, 0.8);
}

.base-radio.radio .control-label {
  padding-left: 0.5em;
}

.base-radio.radio[disabled] {
  opacity: 0.5;
}

.base-radio.radio:hover input[type="radio"] + .check {
  border-color: #30a6d8;
}

.base-radio.radio.is-small {
  border-radius: 3px;
  font-size: 0.75rem;
}

.base-radio.radio.is-medium {
  font-size: 1.25rem;
}

.base-radio.radio.is-large {
  font-size: 1.5rem;
}
</style>
