<template>
  <div :class="fieldClasses" class="field">
    <label v-if="label != null" class="label" @click="labelClick">
      {{ label || '&nbsp;' }}
      <TadsIcon
        v-if="toggleable"
        name="caret"
        :rotate="!!isOpen? 90 : 0"
        :size="8"
        class="ml-1"
      />
    </label>

    <div class="toggleable-content" v-if="toggleable">
      <slot></slot>
    </div>
    <slot v-else />

    <div v-if="errors.length" class="error" v-text="errors[0]"></div>
  </div>
</template>
<script>
import TadsIcon from "./Icon.vue";
export default {
  components: { TadsIcon },
  name: "TadsField",
  props: {
    label: {
      type: String,
      default: null
    },
    strike: Boolean,
    errors: {
      type: Array,
      default: () => []
    },
    inset: {
      type: Boolean,
      default: false
    },
    toggleable: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isOpen: this.open
    };
  },
  computed: {
    fieldClasses() {
      return {
        strike: this.strike && this.label,
        inset: this.inset,
        "no-label": !this.label,
        "large-spacing": this.$attrs.hasOwnProperty("large-spacing"),
        'is-toggleable': this.toggleable,
        'is-closed': !this.isOpen
      };
    },
  },
  watch: {
    errors(val) {
      // Reach into the slot child and set the has-error data.
      if (this.$children.length && this.$children[0].$data.hasError) {
        this.$children[0].$data.hasError = !!val.length;
      }
    },
    open(newVal) {
      this.isOpen = newVal;
    }
  },
  methods: {
    labelClick() {
      if(this.toggleable) {
        this.isOpen = !this.isOpen;
      }
    }
  }
};
</script>

<style scoped>
.field:not(:last-child) {
  margin-bottom: 23px;
}

.field.is-closed .toggleable-content {
  display: none;
}

/* Field should only have one child, but if we have two, we'll put som margin on it. */
.field > :first-child:not(:last-child) {
  margin-bottom: 6px;
}

/*.field.no-label:last-child {*/
/*  margin-top: 1.8rem;*/
/*}*/

.field.large-spacing > .label {
  margin-bottom: 25px;
}

.field.large-spacing:not(:first-child) {
  margin-top: 39px;
}

.field.is-toggleable > .label {
  cursor: pointer;
  justify-content: space-between;
}
.label {
  display: flex;
  align-items: center;
  position: relative;
  color: var(--navy-700);
  font-weight: 500;
  font-size: 16px;
  white-space: nowrap;
  line-height: 1;
  margin-bottom: 5px;
}

.strike > .label {
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  order: 1;
  /*margin-bottom: 16px;*/
}

.inset > .label {
  margin-left: -1rem;
}

.strike > .label {
  color: var(--blue-gray-600);
}

.strike > .label:after {
  content: "";
  z-index: 0;
  height: 1px;
  flex: 1;
  background: var(--blue-gray-500);
  opacity: 0.5;
  transform: translateY(-50%);
  margin-left: var(--navigation-spacing);
  margin-right: calc(var(--navigation-spacing) * -1);
  order: 1;
}

.strike.is-toggleable > .label:after {
  margin-right: 0;
}

.strike > .label .icon {
  order: 2;
}

.error {
  margin-top: 5px;
  color: var(--red-600);
  font-size: 12px;
  line-height: 17px;
}
</style>
