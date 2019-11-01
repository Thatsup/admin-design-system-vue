import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import BaseField from "../src/components/core/Field.vue";
import BaseRange from "../src/components/core/Range.vue";

export default {
  title: "Components | Range",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { BaseRange, BaseField },
  data() {
    return {
      selected: 50
    };
  },
  template: `
    <div>
      <BaseField label="Drag it">
        <BaseRange v-model="selected" min="1" max="500"></BaseRange>
      </BaseField>
      
      <BaseField label="Selected:">
        {{ selected }}
      </BaseField>
    </div>
  `,
  methods: { action: action("clicked") }
});
