import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import TadsDropdown from "../src/components/core/dropdown/Dropdown.vue";
import TadsDropdownItem from "../src/components/core/dropdown/DropdownItem.vue";
import TadsButton from "../src/components/core/Button.vue";

export default {
  title: "Components | Dropdown"
};

export const regular = () => ({
  components: { TadsDropdown, TadsDropdownItem, TadsButton },
  template: `
      <TadsDropdown>
        <template v-slot:trigger>
            <TadsButton type="primary" small>Open dropdown</TadsButton>
        </template>
        
        <TadsDropdownItem @click="action">Item one</TadsDropdownItem>
        <TadsDropdownItem @click="action">Item two</TadsDropdownItem>
      </TadsDropdown>
`,
  methods: { action: action("clicked") }
});
