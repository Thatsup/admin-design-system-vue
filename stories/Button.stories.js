import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import TadsButton from "../src/components/core/Button.vue";

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
  data() {
    return { loading: false };
  },
  template: `<TadsButton type="primary" @click="loading = !loading" :is-loading="loading">Persist heavy document</TadsButton>`,
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
