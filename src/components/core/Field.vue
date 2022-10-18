<template>
  <div :class="fieldClasses" class="field">
    <div v-if="label != null" class="label" @click="labelClick">
      <TadsIcon
        class="toggleable-icon"
        v-if="toggleable"
        name="caret"
        :rotate="!!isOpen? 90 : 0"
        :size="8"
      />
      {{ label || '&nbsp;' }}
      <span class="tooltip-trigger" v-if="tooltip" v-tooltip="tooltip">
        <TadsIcon name="info" size="12" style="display: block;" />
      </span>
      <slot name="after" />
    </div>

    <div class="toggleable-content" v-if="toggleable">
      <slot />
    </div>
    <slot :has-error="errors.length > 0" v-else />

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
    tooltip: {
      type: String,
      default: ""
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
.field:not(:last-of-type) {
  margin-bottom: var(--field-spacing, 10px);
}

.field.is-closed .toggleable-content {
  display: none;
}

.field.is-toggleable > .label {
  cursor: pointer;
}

.field.is-toggleable.strike > .label {
  justify-content: space-between;
}

.toggleable-icon {
  margin-right: 6px;
}

.label {
  display: flex;
  align-items: center;
  position: relative;
  color: var(--navy-700);
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  line-height: 1;
  margin-bottom: var(--field-label-spacing, 5px);
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

.strike > .label:after {
  content: "";
  z-index: 0;
  height: 1px;
  flex: 1;
  background: var(--blue-gray-600);
  opacity: 0.5;
  transform: translateY(-50%);
  margin-left: 8px;
  order: 1;
}

.strike.is-toggleable > .label:after {
  margin-right: 0;
}

.strike > .label .icon {
  order: 0;
}

.error {
  margin-top: 5px;
  color: var(--red-600);
  font-size: 12px;
  line-height: 17px;
}

.tooltip-trigger {
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  cursor: help;
}
</style>
