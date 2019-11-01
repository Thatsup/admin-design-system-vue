<template>
  <div>
    <!-- Add -->
    <BaseListItem v-if="add" :title="addTitle" class="add" @click="addHandler">
      <template v-slot:before>
        <div>
          <BaseIcon name="add"></BaseIcon>
        </div>
      </template>
    </BaseListItem>

    <!-- List items are loading -->
    <div v-if="isLoading">
      <BaseListItem v-for="n in skeletonAmount" :key="n">
        <div class="loading-bars">
          <span class="loading-bar"></span>
          <span class="loading-bar"></span>
        </div>
      </BaseListItem>
    </div>

    <!-- We have data. Show list items! -->
    <div v-else class="base-list">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BaseIcon from "../core/Icon";
import BaseListItem from "./ListItem";

export default {
  name: "BaseList",
  components: { BaseListItem, BaseIcon },
  props: {
    items: {
      type: [Array, Boolean, Object],
      default: () => []
    },
    addHandler: {
      type: Function,
      default: null
    },
    addTitle: {
      type: String,
      default: "Add"
    },
    skeletonAmount: {
      type: Number,
      default: 3
    },
    add: Boolean
  },

  computed: {
    isLoading() {
      return (
        Array.isArray(this.computedItems) && this.computedItems.length === 0
      );
    },
    isEmpty() {
      return this.computedItems === null;
    },
    computedItems() {
      if (typeof this.items === "object" && this.items !== null) {
        return Object.values(this.items);
      }

      return this.items;
    }
  }
};
</script>

<style scoped>
.loading-bars {
  display: flex !important;
  width: 100%;
}

.loading-bar {
  display: block;
  position: relative;
  align-self: center;
  overflow: hidden;

  height: 6px;

  background-color: var(--gray-300);
  border-radius: 3px;
  padding: 0 !important;
}

.loading-bar:first-child {
  flex: 0 0 35%;
  max-width: 35%;
}

.loading-bar:last-child {
  flex: 0 0 10%;
  max-width: 10%;
  margin-left: auto;
}

.add {
  color: var(--blue-600);
}
</style>
