<template>
  <div>
    <!-- Add -->
    <TadsListItem v-if="add" :title="addTitle" class="add" @click="addHandler">
      <template v-slot:before>
        <div class="is-flex">
          <TadsIcon name="plus"></TadsIcon>
        </div>
      </template>
    </TadsListItem>

    <!-- List items are loading -->
    <div v-if="isLoading">
      <TadsListItem v-for="n in skeletonAmount" :key="n">
        <div class="loading-bars">
          <span class="loading-bar"></span>
          <span class="loading-bar"></span>
        </div>
      </TadsListItem>
    </div>

    <!-- We have data. Show list items! -->
    <div v-else class="base-list">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TadsIcon from "../core/Icon";
import TadsListItem from "./ListItem";

export default {
  name: "TadList",
  components: { TadsListItem, TadsIcon },
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

.loading-bar::after {
  content: "";
  position: absolute;
  background: linear-gradient(270deg, rgba(255,255,255,0), rgba(255,255,255,0.7), rgba(255,255,255,0));
  left: 0px;
  top: 0px;
  bottom: 0px;
  width: 100px;
  animation: skeleton-shine 2s infinite;
}

@keyframes skeleton-shine {
  0%{left:-100px;}
  100%{left:100%}
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
