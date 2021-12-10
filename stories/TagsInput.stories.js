import { action } from "@storybook/addon-actions";

import TadsTagsInput from "../src/components/core/TagsInput.vue";
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Components | TagsInput",
  decorators: [withKnobs]
};

export const string = () => ({
  components: { TadsTagsInput },
  data() {
      return {
          data: ''
      }
  },
  template: `
    <div>
      <TadsTagsInput v-model="data" @click="action">Click me</TadsTagsInput>
      {{ data }}
    </div>
    `,
  methods: { action: action("clicked") }
});

export const array = () => ({
  components: { TadsTagsInput },
  data() {
    return {
      data: []
    }
  },
  template: `
    <div>
      <TadsTagsInput v-model="data" @click="action">Click me</TadsTagsInput>
      {{ data }}
    </div>
    `,
  methods: { action: action("clicked") }
});
