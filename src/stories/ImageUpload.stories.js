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
    const src = ref('https://placekitten.com/800/500')

    const uploadImage = (files) => {
      console.log(files);
    }

    return { args, src, uploadImage };
  },
  template: `<div style="width: 200px">
    <ImageUpload :src="src" @delete="src = null" @upload="uploadImage" v-bind="args"></ImageUpload>
  </div>`,
});

export const Default = Template.bind({});
