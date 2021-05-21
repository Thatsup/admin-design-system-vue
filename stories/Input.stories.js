import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

import TadsField from "../src/components/core/Field.vue";
import TadsInput from "../src/components/core/Input.vue";
import TadsTextarea from "../src/components/core/Textarea.vue";

export default {
  title: "Components | Input",
  components: { TadsInput, TadsTextarea },
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

export const small = () => ({
  components: { TadsInput, TadsField },
  template: `
      <TadsField label="What's your name?">
          <TadsInput @input="input" value="Robin N." small></TadsInput>
      </TadsField> 
  `,
  methods: { input: action("input") }
})

export const large = () => ({
  components: { TadsInput, TadsField },
  template: `
      <TadsField label="What's your name?">
          <TadsInput @input="input" value="Robin N." large></TadsInput>
      </TadsField> 
  `,
  methods: { input: action("input") }
})

export const number = () => ({
  components: { TadsInput, TadsField },
  template: `
      <TadsField label="What's your age?">
          <TadsInput type="number" @input="input" :value="27" large border></TadsInput>
      </TadsField> 
  `,
  methods: { input: action("input") }
})

export const textarea = () => ({
  components: { TadsField, TadsTextarea },
  template: `
    <div>
      <TadsField label="Enter your question">
        <TadsTextarea @input="input" value="Default message" placeholder="Question goes here" />
      </TadsField>
  
      <TadsField label="Enter your question">
        <TadsTextarea @input="input" rows="3" value="Default message" placeholder="Question goes here" />
      </TadsField>
    </div>
  `,
  methods: { input: action("input") }
})