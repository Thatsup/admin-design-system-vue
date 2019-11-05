import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs";

import TadsField from "../src/components/core/Field.vue";
import TadsTabs from "../src/components/tabs/Tabs.vue";
import TadsTab from "../src/components/tabs/Tab.vue";

export default {
  title: "Components | Tabs",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { TadsTabs, TadsTab, TadsField },
  props: {
    position: {
      default: select("Position", ["left", "center", "right"], "center")
    }
  },
  template: `
    <TadsTabs :position="position">
        <TadsTab title="Tab 1">
            <h1>Heading 1</h1>        
            <h2>Heading 2</h2>        
        </TadsTab>
        
        <TadsTab title="Tab 2">
            <pre>Some random code</pre>        
        </TadsTab>
    </TadsTabs>
  `,
  methods: { action: action("changed") }
});
