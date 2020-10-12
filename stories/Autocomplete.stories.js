import { action } from "@storybook/addon-actions";

import TadsField from "../src/components/core/Field.vue";
import TadsAutocomplete from "../src/components/autocomplete/Autocomplete.vue";

export default {
  title: "Components | Autocomplete"
};

let data = [
  { name: "Angular (application platform) by Google" },
  { name: "AngularJS by Google" },
  { name: "Backbone.js" },
  { name: "Cappuccino" },
  { name: "Chaplin.js" },
  { name: "Echo" },
  { name: "Ember.js" },
  { name: "Enyo" },
  { name: "Express.js" },
  { name: "Ext JS" },
  { name: "Google Web Toolkit" },
  { name: "JavaScriptMVC" },
  { name: "JsRender/JsViews" },
  { name: "Knockout" },
  { name: "Meteor" },
  { name: "Mojito" },
  { name: "MooTools" },
  { name: "Node.js" },
  { name: "OpenUI5 by SAP" },
  { name: "Polymer (library) by Google" },
  { name: "Prototype JavaScript Framework" },
  { name: "PureMVC" },
  { name: "qooxdoo" },
  { name: "React.js" },
  { name: "Rialto Toolkit" },
  { name: "SproutCore" },
  { name: "Vue.js" },
  { name: "Wakanda Framework" }
];

export const regular = () => ({
  components: { TadsAutocomplete, TadsField },
  computed: {
    filteredPages() {
      return this.items.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.query.toLowerCase()) >= 0
        );
      });
    }
  },
  data() {
    return {
      query: "",
      selected: {},
      items: data
    };
  },
  template: `
      <div>
        <TadsField label="Search for a Javascript framework">
          <TadsAutocomplete
            v-model="query"
            field="name"
            :keep-first="true"
            :open-on-focus="true"
            :data="filteredPages"
            @select="option => selected = option">
          </TadsAutocomplete>
        </TadsField>
         
        <TadsField label="Selected">{{ selected }}</TadsField>
      </div> 
  `,
  methods: { action: action("clicked") }
});

export const multiple = () => ({
  components: { TadsAutocomplete, TadsField },
  computed: {
    filteredPages() {
      return this.items.filter(option => {
        return (
            option.name
                .toString()
                .toLowerCase()
                .indexOf(this.query.toLowerCase()) >= 0
        );
      });
    }
  },
  data() {
    return {
      query: "",
      selected: [],
      items: data
    };
  },
  template: `
      <div>
        <TadsField label="Search for a Javascript framework">
          <TadsAutocomplete
            v-model="query"
            field="name"
            :clear-on-select="true"
            :data="filteredPages"
            @select="option => selected.push(option)">
          </TadsAutocomplete>
        </TadsField>
         
        <ul>
            <li v-for="item in selected">&bull; {{ item }}</li>
        </ul>
      </div> 
  `,
  methods: { action: action("clicked") }
});


export const dropdownOnTop = () => ({
  components: { TadsAutocomplete, TadsField },
  computed: {
    filteredPages() {
      return this.items.filter(option => {
        return (
            option.name
                .toString()
                .toLowerCase()
                .indexOf(this.query.toLowerCase()) >= 0
        );
      });
    }
  },
  data() {
    return {
      query: "",
      selected: [],
      items: data
    };
  },
  template: `
      <div style="padding-top: 400px;">
        <TadsField label="Search for a Javascript framework">
          <TadsAutocomplete
            v-model="query"
            position="top"
            field="name"
            :clear-on-select="true"
            :data="filteredPages"
            @select="option => selected.push(option)">
          </TadsAutocomplete>
        </TadsField>
         
        <ul>
            <li v-for="item in selected">&bull; {{ item }}</li>
        </ul>
      </div> 
  `,
  methods: { action: action("clicked") }
});

export const withPlaceholder = () => ({
  components: { TadsAutocomplete, TadsField },
  computed: {
    filteredPages() {
      return this.items.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.query.toLowerCase()) >= 0
        );
      });
    }
  },
  data() {
    return {
      query: "",
      selected: {},
      items: data
    };
  },
  template: `
      <div>
        <TadsField label="Search for a Javascript framework">
          <TadsAutocomplete
            v-model="query"
            field="name"
            :keep-first="true"
            :open-on-focus="true"
            :data="filteredPages"
            placeholder="Search..."
            @select="option => selected = option">
          </TadsAutocomplete>
        </TadsField>
         
        <TadsField label="Selected">{{ selected }}</TadsField>
      </div> 
  `,
  methods: { action: action("clicked") }
});