import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import BaseField from "../src/components/core/Field.vue";
import BaseTextarea from "../src/components/core/Textarea.vue";

export default {
  title: "Components | Textarea",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { BaseTextarea, BaseField },
  data() {
    return {
      text: ""
    };
  },
  template: `
    <BaseField label="Write something awesome!">
      <BaseTextarea v-model="text" @input="action" placeholder="Lorem ipsum dolor sit..." />
    </BaseField>
  `,
  methods: { action: action("changed") }
});
