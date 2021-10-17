import Tag from '../components/core/Tag.vue';

export default {
  title: 'Core/Tag',
  component: Tag,
  argTypes: {
    color: {
      defaultValue: 'green',
      type: 'string',
      control: { type: 'select' },
      options: ['green', 'yellow', 'blue', 'red', 'gray'],
    }
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
