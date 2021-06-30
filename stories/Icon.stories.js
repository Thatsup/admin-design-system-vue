import {action} from "@storybook/addon-actions";
import {withKnobs, text} from "@storybook/addon-knobs";

import TadsIcon from "../src/components/core/Icon.vue";
import {icons, aliases} from "../src/assets/icons/icons.js";

export default {
  title: "Components | Icon",
  components: {TadsIcon},
  decorators: [withKnobs]
};

export const allIcons = () => ({
  data() {
    return {icons, aliases};
  },
  components: {TadsIcon},
  template: `
      <div style="max-width: 1400px; margin-left: auto; margin-right: auto;">
        <p style="margin-bottom: 20px;">There are ${Object.keys(icons).length} icons</p>
        
        <ul style="display: flex;flex-flow: row wrap;list-style: none;">
          <li v-for="(icon, name) in icons" style="display: inline-flex;flex-direction: row; align-items: center; flex: 0 1 20%; min-width: 120px; padding: 0px 7.5px 20px;">
            <TadsIcon :name="name" style="margin-right: 10px; flex-shrink: 0;"></TadsIcon>
            {{ name }}
            
            <template v-for="(newname, alias) in aliases" v-if="newname === name">
              | {{ alias }}
            </template>
          </li>
        </ul> 
    </div> 
  `,
  methods: {
    getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }
  }
});

export const rotation = () => ({
  data() {
    return {icons}
  },
  components: {TadsIcon},
  template: `
      <div>
          <div>
              <TadsIcon name="chevron"></TadsIcon>
              0deg
          </div>

          <div>
              <TadsIcon name="socialicons" rotate="180"></TadsIcon>
              180deg
          </div>
      </div>
  `,
  methods: {action: action("clicked")}
});

export const solid = () => ({
  data() {
    return {icons}
  },
  components: {TadsIcon},
  template: `
      <div>
          <TadsIcon name="plus-heavy" solid></TadsIcon>
          <TadsIcon name="minus-heavy" solid></TadsIcon>
          <TadsIcon name="plus-heavy" solid rotate="45"></TadsIcon>
          <TadsIcon name="close" solid></TadsIcon>
          <TadsIcon name="clients" solid></TadsIcon>
          <TadsIcon name="image" solid></TadsIcon>
      </div>
  `,
  methods: {action: action("clicked")}
});

export const multipleSizes = () => ({
  data() {
    return {icons}
  },
  components: {TadsIcon},
  template: `
      <div>
          <TadsIcon name="image" :size="14"></TadsIcon>
          <TadsIcon name="image" :size="18"></TadsIcon>
          <TadsIcon name="image" :size="22"></TadsIcon>
          <TadsIcon name="image" size="26"></TadsIcon>
          <TadsIcon name="image" size="30"></TadsIcon>
          <TadsIcon name="image" size="34"></TadsIcon>
      </div>
  `,
  methods: {action: action("clicked")}
});

export const locks = () => ({
  data() {
    return {
      icons,
      locked: false,
    }
  },
  components: {TadsIcon},
  template: `
      <div>
          <TadsIcon 
              @click.native="locked = !locked" 
              :name="locked ? 'lock' : 'lock-open'" 
              size="34"
          ></TadsIcon>
      </div>
  `,
  methods: {action: action("clicked")}
});
