import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

import TadsField from "../src/components/core/Field.vue";
import TadsInput from "../src/components/core/Input.vue";

export default {
  title: "Components | Input",
  components: { TadsInput },
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { TadsInput, TadsField },
  props: {
    value: {
      default: text("Text", "Jack Sparrow")
    }
  },
  template: `
      <TadsField label="What's your name?">
          <TadsInput :value="value"></TadsInput>
      </TadsField> 
  `,
  methods: { action: action("clicked") }
});

export const withError = () => ({
  components: { TadsInput, TadsField },
  data() {
    return {
      errors: {
        name: ["Name must be at least 6 characters"]
      }
    }
  },
  template: `
      <TadsField label="What's your name?" :errors="errors.name">
          <TadsInput value="Robin"></TadsInput>
      </TadsField> 
  `,
  methods: { action: action("clicked") }
});

export const placeholder = () => ({
  components: { TadsInput, TadsField },
  template: `
      <TadsField label="What's your name?">
          <TadsInput placeholder="Type your name"></TadsInput>
      </TadsField> 
  `,
  methods: { action: action("clicked") }
});

export const largeWithBorder = () => ({
  components: { TadsInput, TadsField },
  template: `
      <TadsField label="What's your name?">
          <TadsInput value="Robin N." large border></TadsInput>
      </TadsField> 
  `,
  methods: { action: action("clicked") }
})