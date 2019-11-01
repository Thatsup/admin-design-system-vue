import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

import BaseIcon from "../src/components/core/Icon.vue";
import {icons} from "../src/icons";

export default {
  title: "Components | Icon",
  components: { BaseIcon },
  decorators: [withKnobs]
};

export const allIcons = () => ({
  data() {
    return { icons }
  },
  components: { BaseIcon },
  template: `
      <div>
        <div v-for="(icon, name) in icons">
          <BaseIcon :name="name"></BaseIcon>
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
  components: { BaseIcon },
  template: `
      <div>
        <div>
          180deg
          <BaseIcon name="chevron" rotate="180"></BaseIcon>
        </div> 
        
        <div>
          45deg
          <BaseIcon name="chevron" rotate="45"></BaseIcon>
        </div> 
      </div>
  `,
  methods: { action: action("clicked") }
});
