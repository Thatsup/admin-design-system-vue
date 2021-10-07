import { action } from "@storybook/addon-actions";
import {withKnobs, number} from "@storybook/addon-knobs";

import TadsField from "../src/components/core/Field.vue";
import TadsRange from "../src/components/core/Range.vue";

export default {
  title: "Components | Range",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { TadsRange, TadsField },
  props: {
    value: {
      default: number("Value", 50)
    }
  },
  data() {
    return {
      newValue: this.value
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue
      },
      set(value) {
        this.newValue = value;
        this.$emit('input', value)
      }
    }
  },
  watch: {
    value(newVal) {
      this.newValue = newVal;
    }
  },
  template: `
    <div>
    <TadsField label="Drag it">
      <TadsRange v-model="newValue" min="1" max="500"></TadsRange>
    </TadsField>

    <TadsField label="Selected:">
      {{ newValue }}
    </TadsField>
    </div>
  `,
  methods: { action: action("clicked") }
});

export const negative = () => ({
  components: { TadsRange, TadsField },
  props: {
    value: {
      default: number("Value", 0)
    }
  },
  data() {
    return {
      newValue: this.value
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue
      },
      set(value) {
        this.newValue = value;
        this.$emit('input', value)
      }
    }
  },
  watch: {
    value(newVal) {
      this.newValue = newVal;
    }
  },
  template: `
    <div>
      <TadsField label="Drag it">
        <TadsRange v-model="newValue" min="-500" max="500"></TadsRange>
      </TadsField>
      
      <TadsField label="Selected:">
        {{ newValue }}
      </TadsField>
    </div>
  `,
  methods: { action: action("clicked") }
});

export const withInput = () => ({
  components: { TadsRange, TadsField },
  props: {
    value: {
      default: number("Value", 50)
    }
  },
  data() {
    return {
      newValue: this.value
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue
      },
      set(value) {
        this.newValue = value;
        this.$emit('input', value)
      }
    }
  },
  watch: {
    value(newVal) {
      this.newValue = newVal;
    }
  },
  template: `
    <div>
      <TadsField label="Drag it">
          <TadsRange v-model="newValue" min="1" max="500" has-input></TadsRange>
      </TadsField>
      
      <TadsField label="Selected:">
        {{ newValue }}
      </TadsField>
    </div>
  `,
  methods: { action: action("clicked") }
});

export const noDefaultValue = () => ({
  components: { TadsRange, TadsField },
  data() {
    return {
      newValue: null
    }
  },
  template: `
    <div>
      <TadsField label="Drag it">
          <TadsRange v-model="newValue" min="1" max="500" has-input></TadsRange>
      </TadsField>
      
      <TadsField label="Selected:">
        {{ newValue }}
      </TadsField>
    </div>
  `,
  methods: { action: action("clicked") }
});

export const withPlaceholder = () => ({
  components: { TadsRange, TadsField },
  data() {
    return {
      newValue: null
    }
  },
  template: `
    <div>
      <TadsField label="Drag it">
          <TadsRange v-model="newValue" min="1" max="500" placeholder="400" has-input></TadsRange>
      </TadsField>
      
      <TadsField label="Selected:">
        {{ newValue }}
      </TadsField>
    </div>
  `,
  methods: { action: action("clicked") }
});
