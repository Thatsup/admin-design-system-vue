import Select from '../components/core/Select.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
let options = [
  {value: -1, label: 'Home'},
  {value: 0, label: 'Laravel'},
  {value: 1, label: 'CodeIgniter'},
  {value: 2, label: 'Symfony'},
  {value: 3, label: 'CakePHP'},
  {value: 4, label: 'Yii'},
];
export default {
  title: 'Core/Select',
  component: Select,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    'onUpdate:modelValue': {action: 'clicked'},
    'onInput': {action: 'clicked'},
  },
  args: {
    placeholder: 'Select something',
    autoWidth: true,
    options: options
  },
};


const ObjectTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Select },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<Select v-bind="args">
    <option v-for="option in args.options" :value="option" :key="option.value" v-text="option.label" />
  </Select>`,
});
export const ObjectValue = ObjectTemplate.bind({});
ObjectValue.args = {
  modelValue: options[1],
};

const SizesTemplate = (args) => ({
  components: { Select },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: column; gap: 15px;">
      <Select v-bind="args" tiny>
        <option v-for="option in args.options" :value="option" :key="option.value" v-text="option.label" />
      </Select>

      <Select v-bind="args" small>
        <option v-for="option in args.options" :value="option" :key="option.value" v-text="option.label" />
      </Select>

      <Select v-bind="args">
        <option v-for="option in args.options" :value="option" :key="option.value" v-text="option.label" />
      </Select>

      <Select v-bind="args" large>
        <option v-for="option in args.options" :value="option" :key="option.value" v-text="option.label" />
      </Select>

      <Select v-bind="args" large dir="rtl">
        <option v-for="option in args.options" :value="option" :key="option.value" v-text="option.label" />
      </Select>
    </div>
`,
});
export const Transparent = SizesTemplate.bind({});
Transparent.args = {
  modelValue: options[1],
  transparent: true,
};

export const Border = SizesTemplate.bind({});
Border.args = {
  modelValue: options[1],
  border: true,
};

export const TransparentWithBorder = SizesTemplate.bind({});
TransparentWithBorder.args = {
  modelValue: options[1],
  border: true,
  transparent: true,
};
