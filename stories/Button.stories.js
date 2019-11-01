import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import BaseButton from "../src/components/core/Button.vue";

export const regular = () => ({
  components: { BaseButton },
  template: `<BaseButton @click="action">Click me</BaseButton>`,
  methods: { action: action("clicked") }
});

export const primary = () => ({
  components: { BaseButton },
  template: `<BaseButton type="primary" @click="action">Click me</BaseButton>`,
  methods: { action: action("clicked") }
});

export const loading = () => ({
  components: { BaseButton },
  data() {
    return { loading: false };
  },
  template: `<BaseButton type="primary" @click="loading = !loading" :is-loading="loading">Persist heavy document</BaseButton>`,
  methods: { action: action("clicked") }
});

export const expanded = () => ({
  components: { BaseButton },
  template: `<BaseButton type="primary" @click="action" expanded>Click me</BaseButton>`,
  methods: { action: action("clicked") }
});

export const small = () => ({
  components: { BaseButton },
  template: `<BaseButton type="primary" @click="action" small>Click me</BaseButton>`,
  methods: { action: action("clicked") }
});
