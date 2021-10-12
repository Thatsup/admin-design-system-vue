import { action } from "@storybook/addon-actions";

import TadsField from "../src/components/core/Field.vue";
import TadsInput from "../src/components/core/Input.vue";
import TadsButton from "../src/components/core/Button.vue";
import TadsSelect from "../src/components/core/Select.vue";

export default {
  title: "Intro | Forms"
};

export const smallInlineForm = () => ({
  components: { TadsInput, TadsSelect, TadsButton, TadsField },
  data() {
    return {
      email: "robin.n@thatsup.se"
    };
  },
  template: `
      <div>
        <TadsField label="Sign up to our newsletter">
          <div class="is-flex">
            <TadsInput v-model="email" small class="mr-2" />
            <TadsSelect class="mr-2" :value="2" small>
              <option :value="1" selected>Vue.js</option>
              <option :value="2">React</option>
            </TadsSelect>
            <TadsButton blue small>Submit</TadsButton>
          </div>
        </TadsField>
      </div> 
  `,
  methods: {
    action: action("clicked"),
    activeMethod: action("activated")
  }
});

export const regularInlineForm = () => ({
  components: { TadsInput, TadsSelect, TadsButton, TadsField },
  data() {
    return {
      email: "robin.n@thatsup.se"
    };
  },
  template: `
      <div>
        <TadsField label="Sign up to our newsletter">
          <div class="is-flex">
            <TadsInput v-model="email" class="mr-2" />
            <TadsSelect class="mr-2" :value="2">
              <option :value="1" selected>Vue.js</option>
              <option :value="2">React</option>
            </TadsSelect>
            <TadsButton blue>Submit</TadsButton>
          </div>
        </TadsField>
      </div> 
  `,
  methods: {
    action: action("clicked"),
    activeMethod: action("activated")
  }
});

export const largeInlineForm = () => ({
  components: { TadsInput, TadsSelect, TadsButton, TadsField },
  data() {
    return {
      email: "robin.n@thatsup.se"
    };
  },
  template: `
      <div>
        <TadsField label="Sign up to our newsletter">
          <div class="is-flex">
            <TadsInput v-model="email" large class="mr-2" />
            <TadsSelect class="mr-2" :value="1" large>
              <option :value="1">Vue.js</option>
              <option :value="2">React</option>
            </TadsSelect>
            <TadsButton large blue>Submit</TadsButton>
          </div>
        </TadsField>
      </div> 
  `,
  methods: {
    action: action("clicked"),
    activeMethod: action("activated")
  }
});
