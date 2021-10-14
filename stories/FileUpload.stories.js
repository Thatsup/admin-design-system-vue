import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

import TadsField from "../src/components/core/Field.vue";
import TadsFile from "../src/components/core/FileUpload.vue";

export default {
  title: "Components | File",
  components: { TadsField, TadsFile },
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { TadsFile, TadsField },
  props: {
    value: {
      default: text("Text", "Jack Sparrow")
    }
  },
  template: `
      <TadsField label="Upload profile picture">
          <TadsFile />
      </TadsField> 
  `,
  methods: { action: action("clicked") }
});

export const multiple = () => ({
  components: { TadsFile, TadsField },
  props: {
    value: {
      default: text("Text", "Jack Sparrow")
    }
  },
  template: `
      <TadsField label="Upload profile picture">
          <TadsFile multiple />
      </TadsField> 
  `,
  methods: { action: action("clicked") }
});
