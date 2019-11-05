import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import TadsField from "../src/components/core/Field.vue";
import TadsTextarea from "../src/components/core/Textarea.vue";

export default {
  title: "Components | Textarea",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { TadsTextarea, TadsField },
  data() {
    return {
      text: ""
    };
  },
  template: `
    <TadsField label="Write something awesome!">
      <TadsTextarea v-model="text" @input="action" placeholder="Lorem ipsum dolor sit..." />
    </TadsField>
  `,
  methods: { action: action("changed") }
});
