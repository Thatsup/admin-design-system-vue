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

const CustomTemplate = (args) => ({
  components: { FileUpload },
  setup() {
    return { args };
  },
  template: `<FileUpload v-bind="args">
    <template v-slot:default="{props}">
    
    <div 
        style="position: relative; background-color: var(--gray-400);height: 140px; align-items: center; justify-content: center; display:flex;"
        :style="{
          'background-color': props.isDraggingOver ? 'var(--blue-600)' : 'var(--gray-400)', 
          'color': props.isDraggingOver ? 'white' : 'inherit',
        }"
    >
      <template v-if="props.computedFiles.length">
        <img
            style="object-fit: cover;position: absolute;width: 100%;height: 100%;"
            :src="props.computedFiles[0].url" 
        >
      </template>
      <template v-else>
        <span style="pointer-events: none">
          <span @dragover.prevent @drag.prevent v-if="props.isDraggingOver">Drop it like it's hot</span>
          <span v-else class="text-sm leading-normal">Drag or click to upload</span>
        </span>
      </template>
    </div>
    </template>
  </FileUpload>`,
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

export const CustomUpload = CustomTemplate.bind({
  template: `foo`
});
CustomUpload.args = {
  multiple: true,
  label: 'dassadasds-8ewxo2mhtjs-blake-richard-verdoorn.jpg'
};
