import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import TadsField from "../src/components/core/Field.vue";
import TadsSwitch from "../src/components/core/Switch.vue";

export default {
  title: "Components | Switch",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { TadsSwitch, TadsField },
  data() {
    return {
      active: false
    };
  },
  template: `
    <TadsField label="Flick it">
      <TadsSwitch v-model="active" @input="action" />
    </TadsField>
  `,
  methods: { action: action("changed") }
});

export const withInlineLabel = () => ({
  components: { TadsSwitch, TadsField },
  data() {
    return {
      active: false
    };
  },
  template: `
    <TadsField>
      <TadsSwitch v-model="active" @input="action">
        Flick it      
      </TadsSwitch>
    </TadsField>
  `,
  methods: { action: action("changed") }
});

export const expandedWithLabel = () => ({
  components: { TadsSwitch, TadsField },
  data() {
    return {
      active: false
    };
  },
  template: `
    <TadsField>
      <TadsSwitch v-model="active" @input="action" expanded>
        Flick it      
      </TadsSwitch>
    </TadsField>
  `,
  methods: { action: action("changed") }
});