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

export const indeterminate = () => ({
  components: { TadsSwitch, TadsField },
  data() {
    return {
      active: null,
      indeterminate: true
    };
  },
  watch: {
    active(newVal) {
      this.indeterminate = newVal === null;
    }
  },
  template: `
    <div>
      <TadsField label="Flick it">
        <TadsSwitch v-model="active" :indeterminate="indeterminate" />
      </TadsField>
      <div>
        <a @click="indeterminate = true">Reset</a>
      </div>
    </div>
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