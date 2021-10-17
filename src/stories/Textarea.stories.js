import Textarea from '../components/core/Textarea.vue';

export default {
  title: 'Core/Textarea',
  component: Textarea,
  argTypes: {
    'onUpdate:modelValue': { action: 'clicked' },
  },
  args: {
    modelValue: 'Hello world',
  }
};

const Template = (args) => ({
  components: { Textarea },
  setup() {
    return { args };
  },
  template: '<Textarea v-bind="args" />',
});

export const Default = Template.bind({});
