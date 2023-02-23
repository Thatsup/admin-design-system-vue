import Autocomplete from '../components/autocomplete/Autocomplete.vue';
import {ref} from "vue";

const javascriptFrameworks = [
  {name: 'A really long name of a JavaScript framework'},
  {name: 'AngularJS'},
  {name: 'ReactJS'},
  {name: 'VueJS'},
  {name: 'jQuery'},
  {name: 'BackboneJS'},
  {name: 'NodeJS'},
  {name: 'EmberJS'},
  {name: 'MeteorJS'},
  {name: 'PolymerJS'},
  {name: 'Aurelia'},
]

export default {
  title: 'Core/Autocomplete',
  component: Autocomplete,
  argTypes: {
    'onUpdate:modelValue': { action: 'clicked' },
    'onSelected': { action: 'clicked' },
    position: {
      defaultValue: null,
      type: 'string',
      control: { type: 'select' },
      options: ['top', 'bottom', 'bottom-left', 'bottom-right'],
    },
  },
  args: {
    placeholder: 'Search for a Javascript framework',
    openOnFocus: true,
  },
};

const Template = (args) => ({
  components: { Autocomplete },
  setup() {
    const data = ref(javascriptFrameworks);
    return { args, data };
  },
  template: `
    <div style="display:flex; justify-content: center; align-items: center; height: 300px">
    <div style="width:250px;">
      <Autocomplete :data="data" v-bind="args" />
    </div>
    </div>
  `,
});

export const Default = Template.bind({});

export const Preselected = Template.bind({})
Preselected.args = {
  preselected: javascriptFrameworks[2],
};

export const CustomFilter = Template.bind({});
CustomFilter.args = {
  preselected: null,
  placeholder: 'Search for a Javascript framework in reverse. i.e "SJeuV"',
  filterFunction: (data, searchQuery, field) => {
    return data.filter(option => {
      return option[field]
          .toString()
          .toLowerCase()
          .split('').reverse().join('')
          .includes(searchQuery.toLowerCase())
    });
  }
}

export const CreateItem = Template.bind({});
CreateItem.args = {
  preselected: null,
  canCreate: true,
  placeholder: 'Create or search for a Javascript framework',
  onCreate(value) {
    console.log(value);
  },
}
