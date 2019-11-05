import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import TadsField from "../src/components/core/Field.vue";
import TadsRadio from "../src/components/core/Radio.vue";

export default {
  title: "Components | Radio",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { TadsRadio, TadsField },
  data() {
    return {
      items: [{ label: "Foo", value: 0 }, { label: "Bar", value: 1 }],
      selected: 1
    };
  },
  template: `
    <TadsField label="Pick one">
      <TadsRadio v-for="item in items" :key="item.value" v-model="selected" :native-value="item.value">{{ item.label }}</TadsRadio>
    </TadsField>
  `,
  methods: { action: action("clicked") }
});
