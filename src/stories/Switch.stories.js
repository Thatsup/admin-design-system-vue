import Switch from '../components/core/Switch.vue';
import {ref} from "vue";

export default {
  title: 'Core/Switch',
  component: Switch,
  argTypes: {
    'onUpdate:modelValue': { action: 'clicked' },
    modelValue: {
      type: 'boolean'
    }
  },
  args: {
    modelValue: true,
  }
};

const Template = (args) => ({
  components: { Switch },
  setup() {
    return { args };
  },
  template: '<Switch v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  label: 'Switch this!'
};

export const Complex = Template.bind({});
Complex.args = {
  label: 'Switch this!',
  indeterminate: true,
  'true-value': {foo: 'bar'},
  'false-value': {foo: 'baz'},
};
