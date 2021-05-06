import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs";

import TadsField from "../src/components/core/Field.vue";
import TadsTabs from "../src/components/tabs/Tabs.vue";
import TadsTab from "../src/components/tabs/Tab.vue";

export default {
  title: "Components | Tabs",
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { TadsTabs, TadsTab, TadsField },
  props: {
    position: {
      default: select("Position", ["left", "center", "right"], "left")
    }
  },
  template: `
    <TadsTabs :position="position">
        <TadsTab title="Tab 1" active>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque et laborum, officia perspiciatis provident ut! Autem deleniti doloremque illo ipsam laudantium odio, odit officiis provident quis recusandae repellat voluptates.</p>
            <br>       
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque et laborum, officia perspiciatis provident ut! Autem deleniti doloremque illo ipsam laudantium odio, odit officiis provident quis recusandae repellat voluptates.</p>       
        </TadsTab>
        
        <TadsTab title="Tab 2">
            <img src="//placekitten.com/200" alt="">   
        </TadsTab>
    </TadsTabs>
  `,
  methods: { action: action("changed") }
});

export const icons = () => ({
  components: { TadsTabs, TadsTab, TadsField },
  template: `
    <div>
      <TadsTabs position="left">
        <TadsTab icon="column" active>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque et laborum, officia perspiciatis provident ut! Autem deleniti doloremque illo ipsam laudantium odio, odit officiis provident quis recusandae repellat voluptates.</p>
          <br>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque et laborum, officia perspiciatis provident ut! Autem deleniti doloremque illo ipsam laudantium odio, odit officiis provident quis recusandae repellat voluptates.</p>
        </TadsTab>
  
        <TadsTab icon="heading">
          <img src="//placekitten.com/200" alt="">
        </TadsTab>

        <TadsTab icon="edit" active position="right">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque et laborum, officia perspiciatis provident ut! Autem deleniti doloremque illo ipsam laudantium odio, odit officiis provident quis recusandae repellat voluptates.</p>
          <br>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque et laborum, officia perspiciatis provident ut! Autem deleniti doloremque illo ipsam laudantium odio, odit officiis provident quis recusandae repellat voluptates.</p>
        </TadsTab>

        <TadsTab icon="design" position="right">
          <img src="//placekitten.com/200" alt="">
        </TadsTab>
      </TadsTabs>
    </div>
  `
});

export const clickable = () => ({
  components: { TadsTabs, TadsTab, TadsField },
  methods: {
    clicked() {
      alert('Saved!')
    }
  },
  template: `
    <div>
      <TadsTabs>
        <TadsTab icon="edit" @click="clicked" />
  
        <TadsTab icon="heading" active>
          <img src="//placekitten.com/200" alt="">
        </TadsTab>

        <TadsTab icon="check" tab-class="save">
          <img src="//placekitten.com/200?design" alt="">
        </TadsTab>
      </TadsTabs>
    </div>
  `
});
