import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import TadsField from "../src/components/core/Field.vue";
import TadsRange from "../src/components/core/Range.vue";

export default {
  title: "Components | Range",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { TadsRange, TadsField },
  data() {
    return {
      selected: 50
    };
  },
  template: `
    <div>
      <TadsField label="Drag it">
        <TadsRange v-model="selected" min="1" max="500"></TadsRange>
      </TadsField>
      
      <TadsField label="Selected:">
        {{ selected }}
      </TadsField>
    </div>
  `,
  methods: { action: action("clicked") }
});
