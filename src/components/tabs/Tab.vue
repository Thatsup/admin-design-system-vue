<template>
  <div v-show="isActive" :class="{ disabled: isDisabled }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TadsTab",
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    dataAttrs: {
      type: Object,
      default: () => {}
    },
    to: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isActive: this.active,
      isDisabled: this.disabled
    };
  },
  computed: {
    index() {
      return this.$parent.tabList.indexOf(this);
    }
  },
  watch: {
    "$parent.activeTabIndex"(index) {
      this.isActive = this.index === index;
    },
    disabled() {
      this.isDisabled = this.disabled;
    }
  },
  created() {
    this.$parent.tabList.push(this);
  }
};
</script>
