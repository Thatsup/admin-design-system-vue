<template>
  <div
    class="base-list-item"
    :class="{ 'has-description': !!description, 'is-disabled': disabled }"
  >
    <slot name="before"></slot>

    <div class="main flex" v-on="listeners">
      <slot>
        <div class="title">{{ title }}</div>
        <span v-if="description" class="description">{{ description }}</span>
      </slot>
    </div>

    <slot name="after"></slot>
  </div>
</template>

<script>
export default {
  name: "TadListItem",
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    disabled: Boolean
  },
  computed: {
    listeners(event) {
      return {
        ...this.$listeners,
        input: () => {
          this.$emit("input", event.target.value);
        }
      };
    }
  }
};
</script>

<style>
.base-list-item {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.125rem;
  text-decoration: none;
  margin-bottom: 10px;
  background-color: #fff;
  height: 50px;
}
.base-list-item:last-child {
  margin-bottom: 0;
}

.base-list-item:active,
.base-list-item:focus {
  background-color: var(--gray-100);
}

.base-list-item.has-description {
  height: 67px;
}

.base-list-item.is-disabled {
  opacity: 0.8;
}

.base-list-item > div {
  padding-top: 7px;
  padding-bottom: 7px;
  color: inherit;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
}

.base-list-item .title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 26px;
}

.base-list-item .title + .description {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--blue-gray-600);
  line-height: 22px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.base-list-item .main {
  flex: 1;
  min-width: 0; /* Bugfix for text-overflow: ellipsis. See https://css-tricks.com/flexbox-truncated-text/ */
}

.base-list-item .main:not(:last-child) {
  padding-right: 0;
}

.base-list-item .main:last-child:not(:first-child) {
  padding-left: 0;
}

.base-list-item > div:first-child,
.base-list-item > div:last-child {
  padding-left: var(--navigation-spacing);
  padding-right: var(--navigation-spacing);
}

/* Bring the left slot closer to the title */
.base-list-item > div:first-child {
  padding-right: calc(var(--navigation-spacing) / 2);
}
</style>
