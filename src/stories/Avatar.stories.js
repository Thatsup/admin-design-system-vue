import Avatar from '../components/Avatar.vue';

export default {
  title: 'Core/Avatar',
  component: Avatar,
  args: {
    name: 'John D.',
    id: 'john',
    showName: true,
    avatarUrl: 'https://i.pravatar.cc/300?u=john'
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { Avatar },
  setup() {
    return { args };
  },
  template: '<Avatar v-bind="args" />',
});

export const Default = Template.bind({});
export const Right = Template.bind({});
Right.args = {
  invert: true
}

export const Large = Template.bind({});
Large.args = {
  large: true,
  showName: false,
}
