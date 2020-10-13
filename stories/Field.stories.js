import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

import TadsField from "../src/components/core/Field.vue";

export default {
  title: "Components | Field",
  components: { TadsField },
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { TadsField },
  props: {
    label: {
      default: text("Label", "Field label")
    }
  },
  template: `
    <TadsField :label="label">
        <div>Field content</div>
    </TadsField>
  `
});

export const strike = () => ({
  components: { TadsField },
  props: {
    label: {
      default: text("Label", "Field label")
    }
  },
  template: `
    <TadsField :label="label" style="max-width:300px;" strike>
        Field content
    </TadsField>
  `
});


export const toggleable = () => ({
  components: { TadsField },
  props: {
    label: {
      default: text("Label", "Field label")
    }
  },
  template: `
    <TadsField :label="label" style="max-width:300px;" toggleable>
        Field content
    </TadsField>
  `
});

export const strikeAndToggleable = () => ({
  components: { TadsField },
  props: {
    label: {
      default: text("Label", "Field label")
    }
  },
  template: `
    <TadsField :label="label" style="max-width:300px;" strike toggleable>
        Field content
    </TadsField>
  `
});
