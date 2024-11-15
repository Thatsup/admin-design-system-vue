<template>
  <hr v-if="separator" class="dropdown-divider" />
  <a
    v-else
    class="dropdown-item"
    :class="anchorClasses"
    :role="ariaRoleItem"
    tabindex="0"
  >
    <TadsIcon
      v-if="icon"
      :name="icon"
      :size="14"
      class="dropdown-item__icon"
    />

    <slot />
  </a>
</template>

<script>
import TadsIcon from "../Icon.vue";

export default {
  name: "TadsDropdownItem",
  components: { TadsIcon },
  props: {
    separator: Boolean,
    icon: {
      type: String,
      default: null,
      required: false,
    },
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
  font-size: 12px;
  text-decoration: inherit;
}

.dropdown-item:first-child {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.dropdown-item:last-child {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.dropdown-item {
  color: var(--navy-500);
  display: flex;
  align-items: center;
  line-height: 1.5;
  font-weight: 400;
  padding: 6px 8px;
  position: relative;
}

.dropdown-item:hover {
  background-color: var(--blue-200);
}

.dropdown-divider {
  border: 0;
  border-bottom: 1px solid var(--gray-400);
}

.dropdown-item__icon {
  margin-right: 6px;
  //color: var(--gray-600);
}
</style>
