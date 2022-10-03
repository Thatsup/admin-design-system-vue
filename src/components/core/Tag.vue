<template>
  <span class="tag" :class="color">
    <slot />
    <TadsIcon
        v-if="canDelete"
        @click="$emit('deleted')"
        size="11"
        name="plus-heavy"
        rotate="45"
        class="tag__delete"
    />
  </span>
</template>

<script>
import TadsIcon from "./Icon.vue";

export default {
  name: "TadsTag",
  components: {TadsIcon},
  emits: ['deleted'],
  props: {
    canDelete: Boolean,
    color: {
      type: String,
      default: "gray",
      validator(value) {
        return ['green', 'yellow', 'blue', 'red', 'gray'].indexOf(value) !== -1;
      }
    }
  }
};
</script>

<style>
.tag {
  display: inline-flex;
  align-items: center;

  white-space: nowrap;
  border-radius: 20px;
  padding: 4px 13px;
  font-size: 12px;
  font-weight: 700;

  transition: color 0.2s, background-color 0.2s;
}

.tag::before {
  content: "";
  height: 6px;
  width: 6px;
  display: inline-block;
  border-radius: 4px;
  margin-right: 4px;

  transition: color 0.2s, background-color 0.2s;
}

.tag__delete {
  margin-left: 6px;
  cursor: pointer;
}

.tag__delete:hover {
  opacity: 0.6;
}

.gray {
  color: var(--gray-700);
  background: var(--gray-500);
}

.gray::before {
  background: var(--gray-700);
}

.yellow {
  color: var(--yellow-600);
  background: rgba(243, 193, 55, 0.27);
}

.yellow::before {
  background: #ffd257;
}

.red {
  color: var(--red-600);
  background: rgba(239, 102, 102, 0.25);
}

.red::before {
  background: var(--red-600);
}

.blue {
  color: var(--blue-600);
  background: rgba(46, 166, 215, 0.25);
}

.blue::before {
  background: var(--blue-600);
}

.green {
  color: var(--green-600);
  background: rgba(99, 216, 113, 0.27);
}

.green::before {
  background: var(--green-600);
}
</style>
