import Checkbox from '../components/core/Checkbox.vue';

export default {
  title: 'Core/Checkbox',
  component: Checkbox,
  argTypes: {
    'onUpdate:modelValue': { action: 'clicked' },
  },
  args: {
    'indeterminate': true,
  }
};

const Template = (args) => ({
  components: { Checkbox },
  setup() {
    return { args };
  },
  template: '<Checkbox v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  label: 'Check this out'
};

export const CustomTrueValue = Template.bind({});
CustomTrueValue.args = {
  'true-value': {foo: 'bar'},
  'false-value': {foo: 'baz'},
};
