import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import TadsField from "../src/components/core/Field.vue";
import TadsList from "../src/components/list/List.vue";
import TadsListItem from "../src/components/list/ListItem.vue";

export default {
  title: "Components | List",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { TadsList, TadsListItem, TadsField },
  data() {
    return {
      items: [
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
      ]
    };
  },
  template: `
    <TadsList :items="items" :add="true" add-title="Add new item" :add-handler="() => {action('Added new item')}">
      <TadsListItem v-for="item in items" :key="item.name" :title="item.name" @click="action('Clicked ' + item.name)" />
    </TadsList>
  `,
  methods: { action: action("clicked") }
});
