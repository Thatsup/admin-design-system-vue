import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import BaseSelect from "../src/components/core/Select.vue";
import BaseField from "../src/components/core/Field.vue";

export default {
  title: "Components | Select"
};

export const regular = () => ({
  components: { BaseSelect, BaseField },
  template: `
      <BaseField label="Select something">
          <BaseSelect placeholder="Nothing selected">
              <option value="one">One</option>
              <option value="two">Two</option>
           </BaseSelect>
      </BaseField> 
`,
  methods: { action: action("clicked") }
});

export const expanded = () => ({
  components: { BaseSelect, BaseField },
  template: `
      <BaseField label="Select something">
          <BaseSelect placeholder="Nothing selected" expanded>
              <option value="one">One</option>
              <option value="two">Two</option>
           </BaseSelect>
      </BaseField> 
`,
  methods: { action: action("clicked") }
});

export const transparent = () => ({
  components: { BaseSelect, BaseField },
  template: `
      <BaseField>
          <BaseSelect label="Select something" placeholder="Nothing selected" transparent>
              <option value="one">One</option>
              <option value="two">Two</option>
           </BaseSelect>
      </BaseField> 
  `,
  methods: { action: action("clicked") }
});

export const largeWithBorder = () => ({
  components: { BaseSelect, BaseField },
  template: `
      <BaseField label="Select something">
          <BaseSelect placeholder="Nothing selected" large border>
              <option value="one">One</option>
              <option value="two">Two</option>
           </BaseSelect>
      </BaseField> 
  `,
  methods: { action: action("clicked") }
});
