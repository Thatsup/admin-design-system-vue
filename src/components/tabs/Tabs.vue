<template>
  <div>
    <nav class="tabs" :class="['tabs--' + position]">
      <span
        v-for="(tab, index) in tabList"
        :key="index"
        v-bind="tab.dataAttrs"
        v-on="tab.$listeners"
        :class="{ active: isActive(index), disabled: tab.disabled }"
        @click="select(index)"
      >
        {{ tab.title }}
      </span>
    </nav>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TadsTabs",
  props: {
    position: {
      type: String,
      default: "center",
      validator(value) {
        return ["left", "center", "right"].indexOf(value) > -1;
      }
    }
  },
  data() {
    return {
      tabList: [],
      activeTabIndex: 0
    };
  },
  mounted() {
    this.select(0);
    this.activeTabIndex = this.getInitialActiveTab();
    this.$root.$on("select-tab", index => this.select(index));
  },
  methods: {
    isActive(index) {
      return this.activeTabIndex === index;
    },
    select(index) {
      const tab = this.tabList[index];
      if (!tab.isDisabled) {
        this.activeTabIndex = index;
      }
      this.$emit("changed", tab);
    },
    getInitialActiveTab() {
      const index = this.tabList.findIndex(tab => tab.active);
      return index === -1 ? 0 : index;
    }
  }
};
</script>

<style scoped>
.tabs {
  list-style: none;
  margin: 0;
  padding: 0;
  font-weight: 500;
}

.tabs > span {
  display: inline-block;
  margin-bottom: -1px;
  padding: 1.2em 1.2em 0.7em;
  color: var(--gray-600);
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

span.active,
span:hover {
  border-bottom-color: #0d3b4e;
  color: #0d3b4e;
}

.tabs.tabs--center {
  text-align: center;
}

.tabs.tabs--right {
  text-align: right;
}
</style>
