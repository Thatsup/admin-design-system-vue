import ImageUpload from '../components/core/ImageUpload.vue';
import {ref} from "vue";


export default {
  title: 'Core/ImageUpload',
  component: ImageUpload,
  argTypes: {
  },
};

const Template = (args) => ({
  components: { ImageUpload },
  setup() {
    const src = ref('http://placehold.it/200x500')
    return { args, src };
  },
  template: `<div style="width: 200px">
    <ImageUpload :src="src" @delete="src = null" v-bind="args"></ImageUpload>
  </div>`,
});

export const Default = Template.bind({});
