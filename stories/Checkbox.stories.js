import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import TadsCheckbox from "../src/components/core/Checkbox.vue";
import TadsField from "../src/components/core/Field.vue";

export default {
  title: "Components | Checkbox",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { TadsCheckbox, TadsField },
  props: {
    value: {
      default: boolean("Checked", false)
    }
  },
  template: `
    <TadsField label="Check this out">
      <TadsCheckbox :value="value"></TadsCheckbox>
    </TadsField> 
  `,
  methods: { action: action("clicked") }
});


export const indeterminate = () => ({
  components: { TadsCheckbox, TadsField },
  props: {
    value: {
      default: boolean("Checked", false)
    }
  },
  template: `
    <TadsField label="Check this out">
      <TadsCheckbox :value="value" indeterminate></TadsCheckbox>
    </TadsField> 
  `,
  methods: { action: action("clicked") }
});


export const withPlaceholder = () => ({
  components: { TadsCheckbox, TadsField },
  props: {
    value: {
      default: null
    },
  },
  template: `
    <TadsField label="Check this out">
      <TadsCheckbox :value="value" :placeholder="true"></TadsCheckbox>
    </TadsField> 
  `,
  methods: { action: action("clicked") }
});
