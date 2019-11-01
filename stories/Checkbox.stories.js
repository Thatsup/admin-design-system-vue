import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import BaseCheckbox from "../src/components/core/Checkbox.vue";
import BaseField from "../src/components/core/Field.vue";

export default {
  title: "Components | Checkbox",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { BaseCheckbox, BaseField },
  props: {
    value: {
      default: boolean("Checked", false)
    }
  },
  template: `
    <BaseField label="Check this out">
      <BaseCheckbox :value="value"></BaseCheckbox>
    </BaseField> 
  `,
  methods: { action: action("clicked") }
});
