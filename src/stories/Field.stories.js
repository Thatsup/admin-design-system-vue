import Field from '../components/core/Field.vue';
import Input from '../components/core/Input.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Core/Field',
  component: Field,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    label: {
      defaultValue: "Label this!",
      type: "string"
    },
    strike: {
      defaultValue: true,
      type: "boolean"
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Field, Input },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Field v-bind="args"><Input value="Type something..." /></Field>',
});

const AfterTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Field, Input },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Field v-bind="args"><template #after>✅</template><Input value="Type something..." /></Field>',
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  errors: ['error']
};

export const WithAfter = AfterTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
WithAfter.args = {

};
