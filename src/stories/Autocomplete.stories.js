import Autocomplete from "../components/autocomplete/Autocomplete.vue";
import { ref } from "vue";

const javascriptFrameworks = [
  { name: "A really long name of a JavaScript framework" },
  { name: "AngularJS" },
  { name: "ReactJS" },
  { name: "VueJS" },
  { name: "jQuery" },
  { name: "BackboneJS" },
  { name: "NodeJS" },
  { name: "EmberJS" },
  { name: "MeteorJS" },
  { name: "PolymerJS" },
  { name: "Aurelia" },
];

export default {
  title: "Core/Autocomplete",
  component: Autocomplete,
  argTypes: {
    "onUpdate:modelValue": { action: "clicked" },
    onSelected: { action: "clicked" },
    position: {
      defaultValue: null,
      type: "string",
      control: { type: "select" },
      options: ["top", "bottom", "bottom-left", "bottom-right"],
    },
  },
  args: {
    placeholder: "Search for a Javascript framework",
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

export const Preselected = Template.bind({});
Preselected.args = {
  preselected: javascriptFrameworks[2],
};

export const CustomFilter = Template.bind({});
CustomFilter.args = {
  preselected: null,
  placeholder: 'Search for a Javascript framework in reverse. i.e "SJeuV"',
  filterFunction: (data, searchQuery, field) => {
    return data.filter((option) => {
      return option[field]
        .toString()
        .toLowerCase()
        .split("")
        .reverse()
        .join("")
        .includes(searchQuery.toLowerCase());
    });
  },
};

export const CreateItem = Template.bind({});
CreateItem.args = {
  preselected: null,
  canCreate: true,
  placeholder: "Create or search for a Javascript framework",
  onCreate(value) {
    console.log(value);
  },
};

export const ReactivePreselected = () => ({
  components: { Autocomplete },
  setup() {
    const data = ref(javascriptFrameworks);
    const preselectedItem = ref(null);
    const currentModelValue = ref("");

    const simulateAsyncLoad = () => {
      // Simulate fetching data from an API and hydrating the form
      setTimeout(() => {
        preselectedItem.value = javascriptFrameworks[3]; // Sets to VueJS
      }, 500);
    };

    return { data, preselectedItem, currentModelValue, simulateAsyncLoad };
  },
  template: `
    <div style="display:flex; flex-direction: column; align-items: center; height: 400px; padding-top: 20px;">
      <div style="width:250px; margin-bottom: 2rem;">
        <Autocomplete 
          :data="data" 
          v-model="currentModelValue"
          :preselected="preselectedItem"
          @selected="val => preselectedItem = val"
          placeholder="Search frameworks..." 
        />
      </div>
      
      <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
        <button style="padding: 0.5rem 1rem; cursor: pointer;" @click="simulateAsyncLoad">
          Simulate Async Hydration
        </button>
        <button style="padding: 0.5rem 1rem; cursor: pointer;" @click="preselectedItem = null">
          Clear Preselected
        </button>
      </div>

      <div style="background: #f4f4f4; padding: 1rem; border-radius: 8px; width: 300px; text-align: left; font-family: sans-serif;">
        <p><strong>v-model text:</strong> {{ currentModelValue || 'empty' }}</p>
        <p><strong>selected object:</strong> {{ preselectedItem ? preselectedItem.name : 'null' }}</p>
      </div>
    </div>
  `,
});
