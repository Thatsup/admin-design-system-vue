import Input from '../components/core/Input.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Core/Input',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    modelValue: {
      defaultValue: "Write something here...",
      type: "string"
    },
    placeholder: {
      defaultValue: "... or delete it to show this placeholder :)",
      type: "string"
    },
    type: {
      defaultValue: 'text',
      control: { type: 'select' },
      options: ['text', 'number', 'email', 'date', 'time'],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
let Template = (args) => ({
  components: { Input },
  setup() {
    return { args };
  },
  template: '<Input v-bind="args" />',
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {

};
