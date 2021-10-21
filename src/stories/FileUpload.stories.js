import FileUpload from '../components/core/FileUpload.vue';

export default {
  title: 'Core/FileUpload',
  component: FileUpload,
  argTypes: {
  },
};

const Template = (args) => ({
  components: { FileUpload },
  setup() {
    return { args };
  },
  template: '<div style="width: 200px"><FileUpload v-bind="args" /></div>',
});

export const Default = Template.bind({});
export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
  label: 'Choose files'
};

export const LongLabel = Template.bind({});
LongLabel.args = {
  multiple: true,
  label: 'dassadasds-8ewxo2mhtjs-blake-richard-verdoorn.jpg'
};
