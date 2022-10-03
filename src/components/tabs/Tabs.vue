<template>
  <div>
    <nav class="tabs" :class="['tabs--' + position]">
      <span
        v-for="(tab, index) in tabList"
        :key="index"
        @click="select(index)"
        v-bind="{...tab.$attrs, ...tab.dataAttrs}"
        :class="[tab.tabClass, {
          active: isActive(index),
          disabled: tab.disabled,
          icon: tab.icon,
          ['position-' + tab.position]: tab.position
        }]"
      >
        <template v-if="tab.icon">
          <TadsIcon :name="tab.icon" :size="18" />
        </template>
        <template v-if="tab.title">
          {{ tab.title }}
        </template>
      </span>
    </nav>
    <div v-show="!disableContent" class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TadsIcon from "../core/Icon.vue";
export default {
  name: "TadsTabs",
  components: { TadsIcon },
  props: {
    disableContent: {
      type: Boolean,
      default: false
    },
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
    this.activeTabIndex = this.getInitialActiveTab();
  },
  methods: {
    isActive(index) {
      console.log(this.activeTabIndex, index);
      return this.activeTabIndex === index;
    },
    select(index) {
      const tab = this.tabList[index];

      if (tab.$attrs.click) {
        return;
      }

      if (!tab.isDisabled) {
        this.activeTabIndex = index;
      }

      this.$emit("changed", tab);
      tab.$emit("selected");
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
  white-space: nowrap;
  overflow: auto;
  display: flex;
}

.tabs > span {
  display: inline-flex;
  margin-bottom: -1px;
  padding: 1.2em 1.2em 0.7em;
  color: var(--gray-600);
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tabs > .icon {
  padding: 0.4em 0.75em;
}

.tabs > .position-right {
  border-left: 1px solid var(--blue-gray-300);
  margin-left: auto;
}

.tabs > .position-right ~ .position-right {
  border-left: none;
  margin-left: inherit;
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
