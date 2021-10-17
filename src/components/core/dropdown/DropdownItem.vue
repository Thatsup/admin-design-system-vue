<template>
  <hr v-if="separator" class="dropdown-divider" />
  <a
    v-else
    class="dropdown-item"
    :class="anchorClasses"
    :role="ariaRoleItem"
    tabindex="0"
  >
    <slot />
  </a>
</template>

<script>
export default {
  name: "TadsDropdownItem",
  props: {
    separator: Boolean,
    ariaRole: {
      type: String,
      default: ""
    }
  },
  computed: {
    anchorClasses() {
      return {
        "is-disabled": this.$parent.disabled,
      };
    },
    ariaRoleItem() {
      return this.ariaRole === "menuitem" || this.ariaRole === "listitem"
        ? this.ariaRole
        : null;
    }
  },
};
</script>

<style scoped>
.dropdown-item {
  padding-right: 3rem;
  white-space: nowrap;
  cursor: pointer;
  color: inherit;
  text-decoration: inherit;
}

.dropdown-item {
  color: var(--gray-800);
  display: block;
  line-height: 1.5;
  font-weight: 400;
  padding: 0.375rem 1rem;
  position: relative;
}

.dropdown-item:hover {
  background-color: var(--gray-200);
}

.dropdown-divider {
  border: 0;
  border-bottom: 1px solid var(--gray-400);
  margin: 0.5rem 0;
}
</style>
