import Button from '../components/core/Button.vue';

export default {
  title: 'Core/Button',
  component: Button,
  args: {
    label: 'Click me!'
  },
  argTypes: {
    color: {
      defaultValue: 'blue',
      type: 'string',
      control: { type: 'select' },
      options: ['gray', 'blue', 'green', 'yellow', 'orange', 'navy', 'red', 'white'],
    },
    onClick: {},
  },
};

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args"></Button>',
});

export const Default = Template.bind({});
Default.args = {
  type: 'submit'
};

export const Link = Template.bind({});
Link.args = {
  href: 'https://google.com'
};

export const LongLabel = Template.bind({});
LongLabel.args = {
  label: '8ewxo2mhtjs-blake-richard-verdoorn.jpg',
  style: {width: '250px'}
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Icon = Template.bind({});
Icon.args = {
  icon: 'eye',
  label: null,
};
