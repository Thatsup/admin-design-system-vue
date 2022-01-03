import Icon from '../components/core/Icon.vue';
import {icons} from "../assets/icons/icons.js";

export default {
  title: 'Core/Icon',
  component: Icon,
  argTypes: {
    size: {
      type: 'number',
      defaultValue: 28
    },
    rotate: {
      type: 'number',
      defaultValue: 0
    },
    name: false
  },
};

const Template = (args) => ({
  components: { Icon },
  data() {
    return {
      icons: icons
    }
  },
  setup() {
    return { args };
  },
  template: `
    <div style="max-width: 1400px; margin-left: auto; margin-right: auto;">
    <p style="margin-bottom: 20px;">There are <strong>${Object.keys(icons).length}</strong> available icons</p>

    <ul style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px">
      <li v-for="(icon, name) in icons">
        <Icon v-bind="args" :name="name" style="flex-shrink: 0;"></Icon>
        <span style="margin-left: 10px;">{{ name }}</span>
      </li>
    </ul>
    </div>
  `,
});

export const AllIcons = Template.bind({});
AllIcons.args = {};
