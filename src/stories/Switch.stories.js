import Switch from "../components/core/Switch.vue";

export default {
  title: "Core/Switch",
  component: Switch,
  argTypes: {
    "onUpdate:modelValue": { action: "clicked" },
    modelValue: {
      type: "boolean",
    },
  },
  args: {
    modelValue: true,
  },
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
  label: "Switch this!",
};

export const Success = Template.bind({});
Success.args = {
  label: "You should switch this!",
  type: "success",
};

export const Warning = Template.bind({});
Warning.args = {
  label: "Are you sure you want to switch this?",
  type: "warning",
};

export const Danger = Template.bind({});
Danger.args = {
  label: "It's dangerous to switch this!",
  type: "danger",
};

export const Complex = Template.bind({});
Complex.args = {
  label: "Switch this!",
  indeterminate: true,
  "true-value": { foo: "bar" },
  "false-value": { foo: "baz" },
};
