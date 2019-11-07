import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import TadsSelect from "../src/components/core/Select.vue";
import TadsField from "../src/components/core/Field.vue";

export default {
  title: "Components | Select"
};

export const regular = () => ({
  components: { TadsSelect, TadsField },
  template: `
      <TadsField label="Select something">
          <TadsSelect placeholder="Nothing selected">
              <option value="one">One</option>
              <option value="two">Two</option>
           </TadsSelect>
      </TadsField> 
`,
  methods: { action: action("clicked") }
});

export const disabled = () => ({
  components: { TadsSelect, TadsField },
  template: `
      <TadsField label="Select something">
          <TadsSelect placeholder="Nothing selected" disabled>
              <option value="one">One</option>
              <option value="two">Two</option>
           </TadsSelect>
      </TadsField> 
`,
  methods: { action: action("clicked") }
});

export const expanded = () => ({
  components: { TadsSelect, TadsField },
  template: `
      <TadsField label="Select something">
          <TadsSelect placeholder="Nothing selected" expanded>
              <option value="one">One</option>
              <option value="two">Two</option>
           </TadsSelect>
      </TadsField> 
`,
  methods: { action: action("clicked") }
});

export const transparent = () => ({
  components: { TadsSelect, TadsField },
  template: `
      <TadsField>
          <TadsSelect label="Select something" placeholder="Nothing selected" transparent>
              <option value="one">One</option>
              <option value="two">Two</option>
           </TadsSelect>
      </TadsField> 
  `,
  methods: { action: action("clicked") }
});

export const largeWithBorder = () => ({
  components: { TadsSelect, TadsField },
  template: `
      <TadsField label="Select something">
          <TadsSelect placeholder="Nothing selected" large border>
              <option value="one">One</option>
              <option value="two">Two</option>
           </TadsSelect>
      </TadsField> 
  `,
  methods: { action: action("clicked") }
});
