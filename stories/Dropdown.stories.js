import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import BaseDropdown from "../src/components/core/dropdown/Dropdown.vue";
import BaseDropdownItem from "../src/components/core/dropdown/DropdownItem.vue";
import BaseButton from "../src/components/core/Button.vue";

export default {
  title: "Components | Dropdown"
};

export const regular = () => ({
  components: { BaseDropdown, BaseDropdownItem, BaseButton },
  template: `
      <BaseDropdown>
        <template v-slot:trigger>
            <BaseButton type="primary" small>Open dropdown</BaseButton>
        </template>
        
        <BaseDropdownItem @click="action">Item one</BaseDropdownItem>
        <BaseDropdownItem @click="action">Item two</BaseDropdownItem>
      </BaseDropdown>
`,
  methods: { action: action("clicked") }
});
