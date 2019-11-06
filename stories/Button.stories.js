import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import TadsButton from "../src/components/core/Button.vue";
import {withKnobs} from "@storybook/addon-knobs";

export default {
  title: "Components | Button",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { TadsButton },
  template: `<TadsButton @click="action">Click me</TadsButton>`,
  methods: { action: action("clicked") }
});

export const primary = () => ({
  components: { TadsButton },
  template: `<TadsButton type="primary" @click="action">Click me</TadsButton>`,
  methods: { action: action("clicked") }
});

export const loading = () => ({
  components: { TadsButton },
  template: `<TadsButton type="primary" @click="action" is-loading>Click me</TadsButton>`,
  methods: { action: action("clicked") }
});

export const expanded = () => ({
  components: { TadsButton },
  template: `<TadsButton type="primary" @click="action" expanded>Click me</TadsButton>`,
  methods: { action: action("clicked") }
});

export const small = () => ({
  components: { TadsButton },
  template: `<TadsButton type="primary" @click="action" small>Click me</TadsButton>`,
  methods: { action: action("clicked") }
});
