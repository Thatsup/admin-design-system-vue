import TagsInput from '../components/core/TagsInput.vue';
import {ref, watch} from "vue";

export default {
  title: 'Core/TagsInput',
  component: TagsInput,
  argTypes: {
    'onUpdate:modelValue': { action: 'clicked' },
    modelValue: {
      type: 'array'
    },
    showCount: {
      type: 'boolean'
    }
  },
  args: {
    placeholder: 'Add tags',
  }
};

const Template = (args) => ({
  components: { TagsInput },
  setup() {

    setTimeout(() => {
      args.modelValue = ['hej']
    },2000)

    return { args };
  },
  template: '<TagsInput v-bind="args" />',
});

export const ArrayInput = Template.bind({});
ArrayInput.args = {
  modelValue: ['Restaurant', 'Bar', 'Night club', 'Cafe', 'Barber', 'Tattoo parlour', 'Mall', 'Food market'],
  border: true,
}

export const ArrayWithObjects = Template.bind({});
ArrayWithObjects.args = {
  field: 'name',
  modelValue: [
    {
      name: 'Default',
      id: 1,
    },
    {
      name: 'Bar',
      id: 2,
      tagColor: 'red'
    },
    {
      name: 'Park',
      id: 3,
      tagColor: 'gray'
    }
  ]
}

export const StringInput = Template.bind({});
StringInput.args = {
  modelValue: 'Bar, Restaurant, Cafe',
}

export const FixedValues = Template.bind({});
FixedValues.args = {
  options: ['Google', 'Facebook', 'Tesla', 'Amazon'],
  modelValue: ['Tesla'],
  placeholder: 'Only Google, Facebook or Amazon allowed',
  allowCustom: false,
}
