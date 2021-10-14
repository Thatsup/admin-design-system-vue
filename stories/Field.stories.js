import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";
import VTooltip from "v-tooltip";
import "../src/assets/sass/tooltip.css";
Vue.use(VTooltip);

import TadsField from "../src/components/core/Field.vue";
import Vue from "vue";

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
    <TadsField :label="label" tooltip="Hello">
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
