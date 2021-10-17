import Select from '../components/core/Select.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Core/Select',
  component: Select,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    'onUpdate:modelValue': {action: 'clicked'},
    'onInput': {action: 'clicked'},
  },
  args: {
    modelValue: 0,
    options: [
      {value: 0, label: 'Laravel'},
      {value: 1, label: 'CodeIgniter'},
      {value: 2, label: 'Symfony'},
      {value: 3, label: 'CakePHP'},
      {value: 4, label: 'Yii'},
    ]
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Select },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<Select v-bind="args">
    <option v-for="option in args.options" :value="option.value" v-text="option.label" />
  </Select>`,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {

};
