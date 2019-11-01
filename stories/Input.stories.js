import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

import BaseField from "../src/components/core/Field.vue";
import BaseInput from "../src/components/core/Input.vue";

export default {
  title: "Components | Input",
  components: { BaseInput },
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { BaseInput, BaseField },
  props: {
    value: {
      default: text("Text", "Jack Sparrow")
    }
  },
  template: `
      <BaseField label="Whats your name?">
          <BaseInput :value="value"></BaseInput>
      </BaseField> 
  `,
  methods: { action: action("clicked") }
});

export const placeholder = () => ({
  components: { BaseInput, BaseField },
  template: `
      <BaseField label="Whats your name?">
          <BaseInput placeholder="Type your name"></BaseInput>
      </BaseField> 
  `,
  methods: { action: action("clicked") }
});

export const largeWithBorder = () => ({
  components: { BaseInput, BaseField },
  template: `
      <BaseField label="Whats your name?">
          <BaseInput value="Robin N." large border></BaseInput>
      </BaseField> 
  `,
  methods: { action: action("clicked") }
});
