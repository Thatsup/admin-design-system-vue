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
      default: "gray"
    }
  }
};
</script>

<style lang="scss" scoped>
.tag {
  border-radius: 20px;
  padding: 4px 13px;
  font-size: 12px;
  font-weight: 700;

  &::before {
    content: "";
    height: 6px;
    width: 6px;
    display: inline-block;
    border-radius: 4px;
    margin-right: 4px;
    margin-bottom: 1px;
  }
}

.gray {
  color: var(--gray-700);
  background: var(--gray-500);

  &::before {
    background: var(--gray-700);
  }
}

.yellow {
  color: #f3c137;
  background: rgba(243, 193, 55, 0.27);

  &::before {
    background: #ffd257;
  }
}

.red {
  color: var(--red-600);
  background: rgba(239, 102, 102, 0.25);

  &::before {
    background: var(--red-600);
  }
}
</style>
