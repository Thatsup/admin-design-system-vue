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
  template: '<FileUpload v-bind="args" />',
});

export const Default = Template.bind({});
export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
  label: 'Choose files'
};
