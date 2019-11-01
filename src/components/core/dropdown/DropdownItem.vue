<template>
  <hr v-if="separator" class="dropdown-divider" />
  <a
    v-else-if="!custom && !hasLink"
    class="dropdown-item"
    :class="anchorClasses"
    :role="ariaRoleItem"
    tabindex="0"
    @click="selectItem"
  >
    <slot />
  </a>
  <div
    v-else
    :class="itemClasses"
    :role="ariaRoleItem"
    tabindex="0"
    @click="selectItem"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "BaseDropdownItem",
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Symbol, Function],
      default: null
    },
    separator: Boolean,
    disabled: Boolean,
    custom: Boolean,
    paddingless: Boolean,
    hasLink: Boolean,
    ariaRole: {
      type: String,
      default: ""
    }
  },
  computed: {
    anchorClasses() {
      return {
        "is-disabled": this.$parent.disabled || this.disabled,
        "is-paddingless": this.paddingless,
        "is-active": this.value !== null && this.value === this.$parent.selected
      };
    },
    itemClasses() {
      return {
        "dropdown-item": !this.hasLink,
        "is-disabled": this.disabled,
        "is-paddingless": this.paddingless,
        "is-active":
          this.value !== null && this.value === this.$parent.selected,
        "has-link": this.hasLink
      };
    },
    ariaRoleItem() {
      return this.ariaRole === "menuitem" || this.ariaRole === "listitem"
        ? this.ariaRole
        : null;
    },
    /**
     * Check if item can be clickable.
     */
    isClickable() {
      return (
        !this.$parent.disabled &&
        !this.separator &&
        !this.disabled &&
        !this.custom
      );
    }
  },
  created() {
    if (!this.$parent.$data.$isDropdown) {
      this.$destroy();
      throw new Error("You should wrap bDropdownItem on a bDropdown");
    }
  },
  methods: {
    /**
     * Click listener, select the item.
     */
    selectItem() {
      if (!this.isClickable) return;

      this.$parent.selectItem(this.value);
      this.$emit("click");
    }
  }
};
</script>

<style scoped>
.has-link a.is-active,
a.dropdown-item.is-active {
  background-color: var(--blue-600);
  color: #fff;
}

.has-link a,
a.dropdown-item {
  padding-right: 3rem;
  white-space: nowrap;
  cursor: pointer;
}

.dropdown-item,
.has-link a {
  color: var(--gray-800);
  display: block;
  line-height: 1.5;
  font-weight: 400;
  padding: 0.375rem 1rem;
  position: relative;
}
</style>
