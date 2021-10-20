import TagsInput from '../components/core/TagsInput.vue';

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
    placeholder: 'Add tags'
  }
};

const Template = (args) => ({
  components: { TagsInput },
  setup() {
    return { args };
  },
  template: '<TagsInput v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  modelValue: ['Restaurant', 'Bar', 'Night club', 'Cafe', 'Barber', 'Tattoo parlour', 'Mall', 'Food market']
}
export const ObjectItems = Template.bind({});
ObjectItems.args = {
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
export const SetOptions = Template.bind({});
SetOptions.args = {
  options: ['Google', 'Facebook', 'Tesla', 'Amazon'],
  modelValue: ['Tesla'],
  allowCustom: false,
}
