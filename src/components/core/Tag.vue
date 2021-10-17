<template>
  <span class="tag" :class="color">
    <slot />
  </span>
</template>

<script>
export default {
  name: "TadsTag",
  props: {
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
  border-radius: 20px;
  padding: 4px 13px;
  font-size: 12px;
  font-weight: 700;
  display: inline-block;
}

.tag::before {
  content: "";
  height: 6px;
  width: 6px;
  display: inline-block;
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 1px;
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
