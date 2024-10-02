import Dropdown from "../components/core/dropdown/Dropdown.vue";
import DropdownItem from "../components/core/dropdown/DropdownItem.vue";
import TadsButton from "../components/core/Button.vue";

export default {
  title: "Core/Dropdown",
  component: Dropdown,
};

let Template = (args) => ({
  components: { Dropdown, DropdownItem, TadsButton },
  setup() {
    return { args };
  },
  template: `
    <Dropdown>
    <template #trigger>
      <TadsButton blue>
        Open menu
      </TadsButton>
    </template>
    
    <template #default="{ close }">
      <DropdownItem href="https://google.com?q=Foo" target="_blank">Foo</DropdownItem>
      <DropdownItem href="https://google.com?q=Bar" target="_blank">Bar</DropdownItem>
      <DropdownItem separator />
      <DropdownItem href="https://google.com?q=Boo" target="_blank">Boo</DropdownItem>
      <DropdownItem>I do nothing</DropdownItem>
      <DropdownItem @click="close">I close the dropdown</DropdownItem>
      </template>
    </Dropdown>`,
});

export const Default = Template.bind({});
Default.args = {};
