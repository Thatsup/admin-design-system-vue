import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

import TadsIcon from "../src/components/core/Icon.vue";
import {icons} from "../src/icons";

export default {
  title: "Components | Icon",
  components: { TadsIcon },
  decorators: [withKnobs]
};

export const allIcons = () => ({
  data() {
    return { icons }
  },
  components: { TadsIcon },
  template: `
      <div>
        <div v-for="(icon, name) in icons">
          <TadsIcon :name="name"></TadsIcon>
          {{ name }}
        </div>
      </div> 
  `,
  methods: { action: action("clicked") }
});

export const rotation = () => ({
  data() {
    return { icons }
  },
  components: { TadsIcon },
  template: `
      <div>
        <div>
          180deg
          <TadsIcon name="chevron" rotate="180"></TadsIcon>
        </div> 
        
        <div>
          45deg
          <TadsIcon name="chevron" rotate="45"></TadsIcon>
        </div> 
      </div>
  `,
  methods: { action: action("clicked") }
});

export const solid = () => ({
  data() {
    return { icons }
  },
  components: { TadsIcon },
  template: `
      <div>
          <TadsIcon name="add" solid></TadsIcon>
          <TadsIcon name="close" solid></TadsIcon>
          <TadsIcon name="clients" solid></TadsIcon>
      </div>
  `,
  methods: { action: action("clicked") }
});
