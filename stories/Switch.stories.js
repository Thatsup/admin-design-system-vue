import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import BaseField from "../src/components/core/Field.vue";
import BaseSwitch from "../src/components/core/Switch.vue";

export default {
  title: "Components | Switch",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { BaseSwitch, BaseField },
  data() {
    return {
      active: false
    };
  },
  template: `
    <BaseField label="Flick it">
      <BaseSwitch v-model="active" @input="action" />
    </BaseField>
  `,
  methods: { action: action("changed") }
});

export const withInlineLabel = () => ({
  components: { BaseSwitch, BaseField },
  data() {
    return {
      active: false
    };
  },
  template: `
    <BaseField>
      <BaseSwitch v-model="active" @input="action">
        Flick it      
      </BaseSwitch>
    </BaseField>
  `,
  methods: { action: action("changed") }
});

export const expandedWithLabel = () => ({
  components: { BaseSwitch, BaseField },
  data() {
    return {
      active: false
    };
  },
  template: `
    <BaseField>
      <BaseSwitch v-model="active" @input="action" expanded>
        Flick it      
      </BaseSwitch>
    </BaseField>
  `,
  methods: { action: action("changed") }
});