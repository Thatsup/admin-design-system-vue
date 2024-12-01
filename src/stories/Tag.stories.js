import Tag from "../components/core/Tag.vue";

export default {
  title: "Core/Tag",
  component: Tag,
  argTypes: {
    color: {
      type: "string",
      control: { type: "select" },
      options: ["green", "yellow", "blue", "red", "gray"],
    },
  },
};

const Template = (args) => ({
  components: { Tag },
  setup() {
    return { args };
  },
  template: '<Tag v-bind="args">Active</Tag>',
});

export const Default = Template.bind({});
Default.args = {};

const ColorsTemplate = (args) => ({
  components: { Tag },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; gap: 15px;">
      <Tag v-bind="args" color="green">Active</Tag>
      <Tag v-bind="args" color="yellow">Active</Tag>
      <Tag v-bind="args" color="blue">Active</Tag>
      <Tag v-bind="args" color="red">Active</Tag>
      <Tag v-bind="args" color="gray">Active</Tag>
    </div>
  `,
});

export const Colors = ColorsTemplate.bind({});
Colors.args = {};

const IconsTemplate = (args) => ({
  components: { Tag },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; gap: 15px;">
      <Tag v-bind="args" color="green" icon="data">Active</Tag>
      <Tag v-bind="args" color="yellow" icon="anchor">Active</Tag>
      <Tag v-bind="args" color="blue" icon="design-variables">Active</Tag>
      <Tag v-bind="args" color="red" icon="info">Active</Tag>
      <Tag v-bind="args" color="gray" icon="lock">Active</Tag>
    </div>
  `,
});

export const Icons = IconsTemplate.bind({});
Icons.args = {};
