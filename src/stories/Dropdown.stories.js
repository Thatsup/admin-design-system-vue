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
      <TadsButton blue small>
        Open menu
      </TadsButton>
    </template>
    
    <template #default="{ close }">
      <DropdownItem icon="settings" href="https://google.com?q=Bar" target="_blank">Settings</DropdownItem>
      <DropdownItem icon="user-profile">My profile</DropdownItem>
      <DropdownItem icon="user-simulate" href="https://google.com?q=Boo" target="_blank">Simulate user</DropdownItem>
      <DropdownItem icon="support-alt">Support</DropdownItem>
      <DropdownItem icon="trash" @click="close">Test</DropdownItem>
      <DropdownItem separator />
      <DropdownItem icon="log-out">Log out</DropdownItem>
      </template>
    </Dropdown>`,
});

export const Default = Template.bind({});
Default.args = {};
