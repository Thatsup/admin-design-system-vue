import { action } from "@storybook/addon-actions";

import TadsSelect from "../src/components/core/Select.vue";
import TadsField from "../src/components/core/Field.vue";
import { withKnobs, select } from "@storybook/addon-knobs";

export default {
  title: "Components | Select",
  decorators: [withKnobs]
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
          <TadsSelect placeholder="Nothing selected" transparent>
              <option value="one">One</option>
              <option value="two">Two</option>
              <option value="three">Three little bugs walked on the street</option>
           </TadsSelect>
      </TadsField> 
  `,
  methods: { action: action("clicked") }
});

export const transparentWithLabel = () => ({
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

const label = "Values";
const options = {
  one: "one",
  two: "two",
  three: "three",
  None: null
};
const defaultValue = "one";

export const autoWidth = () => ({
  components: { TadsSelect, TadsField },
  props: {
    value: {
      default: select(label, options, defaultValue)
    }
  },
  template: `
      <TadsField label="Select something">
          <TadsSelect :value="value" placeholder="Nothing selected" large border :max-width="300">
              <option value="one">One</option>
              <option value="two">Two</option>
              <option value="three">A long text for testing auto width feature</option>
           </TadsSelect>
      </TadsField> 
  `,
  methods: { action: action("clicked") }
});
