import Icon from '../components/core/Icon.vue';
import {icons} from "../assets/icons/icons.js";
import { computed } from "vue";

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
    color: {
      control: {
        type: 'color',
      },
      defaultValue: '#2a2a2a'
    },
    solidBackground: {
      control: {
        type: 'color',
      },
      defaultValue: '#c4c4c4'
    },
    solid: false,
    name: false,
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
    const style = computed(() => {
      return {
        color: args.color,
        'background-color': args.solid ? args.solidBackground : false,
        'flex-shrink': 0,
      };
    })

    return { args, style };
  },
  template: `
    <div style="max-width: 1400px; margin-left: auto; margin-right: auto;">
    <p style="margin-bottom: 20px;">There are <strong>${Object.keys(icons).length}</strong> available icons</p>

    <ul style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px">
      <li style="display: flex;align-items: center;" v-for="(icon, name) in icons">
        <Icon v-bind="args" :name="name" :style="style"></Icon>
        <span style="margin-left: 10px;">{{ name }}</span>
      </li>
    </ul>
    </div>
  `,
});

export const AllIcons = Template.bind({});
AllIcons.args = {};
