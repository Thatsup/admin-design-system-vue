import { action } from "@storybook/addon-actions";

import BaseField from "../src/components/core/Field.vue";
import BaseAutocomplete from "../src/components/autocomplete/Autocomplete.vue";

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
  components: { BaseAutocomplete, BaseField },
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
        <BaseField label="Search for a Javascript framework">
          <BaseAutocomplete
            v-model="query"
            field="name"
            :keep-first="true"
            :open-on-focus="true"
            :data="filteredPages"
            @select="option => selected = option">
          </BaseAutocomplete>
        </BaseField>
         
        <BaseField label="Selected">{{ selected }}</BaseField>
      </div> 
  `,
  methods: { action: action("clicked") }
});

export const multiple = () => ({
  components: { BaseAutocomplete, BaseField },
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
        <BaseField label="Search for a Javascript framework">
          <BaseAutocomplete
            v-model="query"
            field="name"
            :clear-on-select="true"
            :data="filteredPages"
            @select="option => selected.push(option)">
          </BaseAutocomplete>
        </BaseField>
         
        <ul>
            <li v-for="item in selected">&bull; {{ item }}</li>
        </ul>
      </div> 
  `,
  methods: { action: action("clicked") }
});
