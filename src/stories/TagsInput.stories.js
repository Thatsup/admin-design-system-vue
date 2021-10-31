import TagsInput from '../components/core/TagsInput.vue';

import { ref } from 'vue';

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

export const ArrayInput = Template.bind({});
ArrayInput.args = {
  modelValue: ['Restaurant', 'Bar', 'Night club', 'Café', 'Barber', 'Tattoo parlour', 'Mall', 'Food market'],
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

export const ArrayWithDuplicates = Template.bind({});
ArrayWithDuplicates.args = {
  modelValue: ['Restaurant'],
  border: true,
  placeholder: 'Add "Restaurant"',
  allowDuplicates: true
}

export const StringInput = Template.bind({});
StringInput.args = {
  modelValue: 'Bar, Restaurant, Cafe'
}

export const FixedValues = Template.bind({});
let options = [
  {id: 1, companyName: 'Google'},
  {id: 2, companyName: 'Facebook'},
  {id: 3, companyName: 'Tesla'},
  {id: 4, companyName: 'Amazon'},
  {id: 5, companyName: 'Thatsúp'}
];
FixedValues.args = {
  options: options,
  modelValue: [options[0]],
  labelField: 'companyName',
  idField: 'id',
  placeholder: 'Only big tech allowed',
  allowCustom: false,
}

export const FixedStringValues = Template.bind({});
FixedStringValues.args = {
  options: ['Google', 'Facebook', 'Tesla', 'Amazon'],
  modelValue: ['Tesla'],
  placeholder: 'Only Google, Facebook or Amazon allowed',
  allowCustom: false,
}


export const SortableString = Template.bind({});
SortableString.args = {
  modelValue: 'Bar, Restaurant, Café',
  sortable: true
}

export const SortableArray = Template.bind({});
SortableArray.args = {
  options: ['Google', 'Facebook', 'Tesla', 'Amazon'],
  modelValue: ['Tesla', 'Facebook'],
  placeholder: 'Only Google, Facebook or Amazon allowed',
  allowCustom: false,
  sortable: true
}

export const SortableObjects = Template.bind({});
SortableObjects.args = {
  options: options,
  modelValue: [options[0]],
  labelField: 'companyName',
  idField: 'id',
  placeholder: 'Only Google, Facebook or Amazon allowed',
  allowCustom: false,
  sortable: true
}

export const CustomSortableObjects = Template.bind({});
CustomSortableObjects.args = {
  options: options,
  modelValue: [options[0]],
  field: 'companyName',
  placeholder: 'Add whatever',
  allowCustom: true,
  sortable: true
}