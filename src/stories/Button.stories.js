import Button from '../components/core/Button.vue';

const colorOptions = ['gray', 'blue', 'green', 'yellow', 'orange', 'navy', 'red', 'white'];

export default {
  title: 'Core/Button',
  component: Button,
  args: {
    label: 'Click me!'
  },
  argTypes: {
    color: {
      defaultValue: null,
      type: 'string',
      control: { type: 'select' },
      options: colorOptions,
    },
    onClick: {},
  },
};

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args, colorOptions };
  },
  template: `
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px;">
      <Button v-for="color in colorOptions" v-bind="args" :color="color"></Button>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  type: 'submit'
};

export const Link = Template.bind({});
Link.args = {
  href: 'https://google.com',
  disabled: false,
  target: '_blank',
};

export const LongLabel = Template.bind({});
LongLabel.args = {
  label: '8ewxo2mhtjs-blake-richard-verdoorn.jpg',
  style: {width: '250px'}
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  disabled: false
};

export const Icon = Template.bind({});
Icon.args = {
  icon: 'eye',
  label: null,
};
