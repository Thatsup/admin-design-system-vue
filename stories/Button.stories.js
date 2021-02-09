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

export const colors = () => ({
  components: { TadsButton },
  template: `
    <div>
      <TadsButton>Regular</TadsButton>
      <TadsButton blue>Blue</TadsButton>
      <TadsButton green>Green</TadsButton>
      <TadsButton yellow>Yellow</TadsButton>
      <TadsButton navy>Navy</TadsButton>
      <TadsButton red>Red</TadsButton>
    </div>
  `,
  methods: { action: action("clicked") }
});

export const sizes = () => ({
  components: { TadsButton },
  template: `
    <div>
      <TadsButton small blue @click="action">Small button</TadsButton><br>
      <TadsButton style="margin-top: 10px;" blue @click="action">Regular button</TadsButton><br>
      <TadsButton style="margin-top: 10px;" large blue @click="action">Large button</TadsButton><br>
    </div>
  `,
  methods: { action: action("clicked") }
});

export const loading = () => ({
  components: { TadsButton },
  template: `<TadsButton blue @click="action" is-loading>Click me</TadsButton>`,
  methods: { action: action("clicked") }
});

export const expanded = () => ({
  components: { TadsButton },
  template: `<TadsButton blue @click="action" expanded>Click me</TadsButton>`,
  methods: { action: action("clicked") }
});

export const small = () => ({
  components: { TadsButton },
  template: `<TadsButton blue @click="action" small>Click me</TadsButton>`,
  methods: { action: action("clicked") }
});

export const link = () => ({
  components: { TadsButton },
  template: `<TadsButton blue href="https://example.org" target="_blank">Click me</TadsButton>`,
  methods: { action: action("clicked") }
});
