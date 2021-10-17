<template>
  <component
    :is="$attrs.href ? 'a' : 'div'"
    class="base-list-item"
    :class="{ 'has-description': !!description, 'is-disabled': disabled, 'is-clickable': $attrs.onClick || $attrs.href }"
  >
    <slot name="before"></slot>

    <div class="main flex">
      <slot>
        <div class="title">{{ title }}</div>
        <span v-if="description" class="description">{{ description }}</span>
      </slot>
    </div>

    <slot name="after"></slot>
  </component>
</template>

<script>
export default {
  name: "TadsListItem",
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
  color: inherit;
  height: 50px;
}
.base-list-item:last-child {
  margin-bottom: 0;
}

.base-list-item > *:empty {
  display: none;
}

.base-list-item.is-clickable {
  cursor: pointer;
}

.base-list-item.is-clickable:active,
.base-list-item.is-clickable:focus {
  background-color: var(--gray-100);
}

.base-list-item.has-description {
  height: 67px;
}

.base-list-item.is-disabled {
  opacity: 0.8;
}

.base-list-item > * {
  padding-top: 7px;
  padding-bottom: 7px;
  color: inherit;
  display: inline-block;
  text-decoration: none;
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

.base-list-item .main {
  padding-left: var(--navigation-spacing);
  padding-right: var(--navigation-spacing);
}

.base-list-item > *:first-child {
  padding-right: var(--navigation-spacing);
  padding-left: var(--navigation-spacing);
}

.base-list-item > *:last-child {
  padding-right: var(--navigation-spacing);
  padding-left: var(--navigation-spacing);
}

.base-list-item > *:first-child:not(:empty) + .main {
  padding-left: 0;
  padding-right: 0;
}

/* Bring the left slot closer to the title */
.base-list-item > div:first-child {
  padding-right: calc(var(--navigation-spacing) / 2);
}
</style>
