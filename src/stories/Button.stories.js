import Button from '../components/core/Button.vue';

export default {
  title: 'Core/Button',
  component: Button,
  args: {
    label: 'Click me!'
  },
  argTypes: {
    color: { control: 'color' },
    onClick: {},
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
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
};

export const LongLabel = Template.bind({});
LongLabel.args = {
  label: '8ewxo2mhtjs-blake-richard-verdoorn.jpg',
  style: {width: '250px'}
};

export const Primary = Template.bind({});
Primary.args = {
  blue: true,
};

export const Green = Template.bind({});
Green.args = {
  green: true
};

export const Large = Template.bind({});
Large.args = {
  large: true,
  blue: true,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  large: true,
  blue: true,
};

export const LabelWithIcon = Template.bind({});
LabelWithIcon.args = {
  icon: 'eye',
};

export const Icon = Template.bind({});
Icon.args = {
  icon: 'eye',
  label: null,
};
