import { action } from "@storybook/addon-actions";
import {withKnobs} from "@storybook/addon-knobs";

import TadsTag from "../src/components/core/Tag.vue";

export default {
  title: "Components | Tag",
  components: { TadsTag },
  decorators: [withKnobs]
};

export const regular = () => ({
  components: { TadsTag },
  template: `
     <div>
         <TadsTag>Not available</TadsTag>
         <TadsTag color="blue">Confirmed</TadsTag>
         <TadsTag color="green">Accepted</TadsTag>
         <TadsTag color="red">Inactive</TadsTag>
         <TadsTag color="yellow">Pending</TadsTag>
     </div> 
  `,
  methods: { action: action("clicked") }
});
