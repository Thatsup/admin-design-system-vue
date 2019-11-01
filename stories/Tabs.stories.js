import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs";

import BaseField from "../src/components/core/Field.vue";
import BaseTabs from "../src/components/tabs/Tabs.vue";
import BaseTab from "../src/components/tabs/Tab.vue";

export default {
  title: "Components | Tabs",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { BaseTabs, BaseTab, BaseField },
  props: {
    position: {
      default: select("Position", ["left", "center", "right"], "center")
    }
  },
  template: `
    <BaseTabs :position="position">
        <BaseTab title="Tab 1">
            <h1>Heading 1</h1>        
            <h2>Heading 2</h2>        
        </BaseTab>
        
        <BaseTab title="Tab 2">
            <pre>Some random code</pre>        
        </BaseTab>
    </BaseTabs>
  `,
  methods: { action: action("changed") }
});
