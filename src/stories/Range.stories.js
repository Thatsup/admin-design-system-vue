import Range from '../components/core/Range.vue';
import {reactive, ref} from "vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Core/Range',
  component: Range,
  argTypes: {
    min: {
      defaultValue: 10,
      type: 'number',
    },
    max: {
      defaultValue: 100,
      type: 'number',
    },
    step: {
      defaultValue: 5,
      type: 'number',
    },
    withInput: {
      defaultValue: true
    }
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Range },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  data() {
    return {
      rangeValue: 20
    }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Range v-model="rangeValue" v-bind="args" />',
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  label: 'Check this out'
};
