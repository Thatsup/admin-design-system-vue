<template>
  <div class="dropdown" :class="rootClasses">
    <div
      v-if="!inline"
      ref="trigger"
      role="button"
      class="dropdown-trigger"
      aria-haspopup="true"
      @click="toggle"
    >
      <slot name="trigger" />
    </div>

    <transition :name="animation">
      <div
        v-show="(!disabled && (isActive || hoverable)) || inline"
        ref="dropdownMenu"
        class="dropdown-menu"
        :aria-hidden="!isActive"
      >
        <div
          class="dropdown-content"
          :class="contentClass"
          :role="ariaRoleMenu"
        >
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "TadsDropdown",
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Symbol, Function],
      default: null
    },
    disabled: Boolean,
    hoverable: Boolean,
    inline: Boolean,
    position: {
      type: String,
      default: null,
      validator(value) {
        return (
          ["is-top-right", "is-top-left", "is-bottom-left"].indexOf(value) > -1
        );
      }
    },
    mobileModal: {
      type: Boolean,
      default: false
    },
    ariaRole: {
      type: String,
      default: ""
    },
    animation: {
      type: String,
      default: "fade"
    },
    contentClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: this.value,
      isActive: false,
      $isDropdown: true // Used internally by DropdownItem
    };
  },
  computed: {
    rootClasses() {
      return [
        this.position,
        {
          "is-disabled": this.disabled,
          "is-hoverable": this.hoverable,
          "is-inline": this.inline,
          "is-active": this.isActive || this.inline,
          "is-mobile-modal": this.isMobileModal
        }
      ];
    },
    isMobileModal() {
      return this.mobileModal && !this.inline && !this.hoverable;
    },
    ariaRoleMenu() {
      return this.ariaRole === "menu" || this.ariaRole === "list"
        ? this.ariaRole
        : null;
    }
  },
  watch: {
    /**
     * When v-model is changed set the new selected item.
     */
    value(value) {
      this.selected = value;
    },

    /**
     * Emit event when isActive value is changed.
     */
    isActive(value) {
      this.$emit("active-change", value);
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("click", this.clickedOutside);
    }
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      document.removeEventListener("click", this.clickedOutside);
    }
  },
  methods: {
    /**
     * Click listener from DropdownItem.
     *   1. Set new selected item.
     *   2. Emit input event to update the user v-model.
     *   3. Close the dropdown.
     */
    selectItem(value) {
      if (this.selected !== value) {
        this.$emit("change", value);
        this.selected = value;
      }
      this.$emit("input", value);
      this.isActive = false;
    },

    /**
     * White-listed items to not close when clicked.
     */
    isInWhiteList(el) {
      if (el === this.$refs.dropdownMenu) return true;
      if (el === this.$refs.trigger) return true;
      // All chidren from dropdown
      if (this.$refs.dropdownMenu !== undefined) {
        const children = this.$refs.dropdownMenu.querySelectorAll("*");
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }
      // All children from trigger
      if (this.$refs.trigger !== undefined) {
        const children = this.$refs.trigger.querySelectorAll("*");
        for (const child of children) {
          if (el === child) {
            return true;
          }
        }
      }

      return false;
    },

    /**
     * Close dropdown if clicked outside.
     */
    clickedOutside(event) {
      if (this.inline) return;

      if (!this.isInWhiteList(event.target)) this.isActive = false;
    },

    /**
     * Toggle dropdown if it's not disabled.
     */
    toggle() {
      if (this.disabled || this.hoverable) return;

      if (!this.isActive) {
        // if not active, toggle after clickOutside event
        // this fixes toggling programmatic
        this.$nextTick(() => {
          this.isActive = !this.isActive;
        });
      } else {
        this.isActive = !this.isActive;
      }
    }
  }
};
</script>

<style scoped>
.dropdown {
  display: inline-flex;
  position: relative;
  vertical-align: top;
}

.dropdown.is-bottom-left .dropdown-menu {
  right: 0;
  left: auto;
}

.dropdown.is-top-left .dropdown-menu {
  top: auto;
  bottom: 100%;
  right: 0;
  left: auto;
}

.dropdown.is-active .dropdown-menu,
.dropdown.is-hoverable:hover .dropdown-menu {
  display: block;
}

.dropdown-menu {
  display: none;
  left: 0;
  min-width: 12rem;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  z-index: 1000;
}

.dropdown-content {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 3px hsla(0, 0%, 4%, 0.1), 0 0 0 1px hsla(0, 0%, 4%, 0.1);
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}

.dropdown-trigger > * {
  cursor: pointer;
}
</style>
