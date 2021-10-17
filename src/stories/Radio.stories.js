import Radio from '../components/core/Radio.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Core/Radio',
  component: Radio,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    'onUpdate:modelValue': { action: 'clicked' },
    modelValue: {
      defaultValue: false,
      type: 'boolean'
    }
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Radio },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <Radio v-bind="args" value="1" name="foo" /><br>
    <Radio v-bind="args" value="2" name="foo" />
  `,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  label: 'Check this out'
};
