import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import BaseField from "../src/components/core/Field.vue";
import BaseRadio from "../src/components/core/Radio.vue";

export default {
  title: "Components | Radio",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { BaseRadio, BaseField },
  data() {
    return {
      items: [{ label: "Foo", value: 0 }, { label: "Bar", value: 1 }],
      selected: 1
    };
  },
  template: `
    <BaseField label="Pick one">
      <BaseRadio v-for="item in items" :key="item.value" v-model="selected" :native-value="item.value">{{ item.label }}</BaseRadio>
    </BaseField>
  `,
  methods: { action: action("clicked") }
});
