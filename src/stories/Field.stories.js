import Field from '../components/core/Field.vue';
import Input from '../components/core/Input.vue';

export default {
  title: 'Core/Field',
  component: Field,
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

const Template = (args) => ({
  components: { Field, Input },
  setup() {
    return { args };
  },
  template: '<Field v-bind="args"><Input value="Type something..." /></Field>',
});

const AfterTemplate = (args) => ({
  components: { Field, Input },
  setup() {
    return { args };
  },
  template: '<Field v-bind="args"><template #after><span style="margin-left: auto">✅</span></template><Input value="Type something..." /></Field>',
});

export const Default = Template.bind({});
Default.args = {
  errors: ['error']
};

export const WithAfter = AfterTemplate.bind({});
WithAfter.args = {
  strike: false
};
