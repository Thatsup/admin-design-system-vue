import { action } from "@storybook/addon-actions";

import Avatar from "../src/components/Avatar.vue";

export default {
  title: "Components | Avatar",
  components: { Avatar }
};

export const regular = () => ({
  components: { Avatar },
  data() {
    return {
      user: {
        email: "admin@example.com",
        name: "Admin Adminsson"
      }
    };
  },
  template: `<Avatar :user="user" />`,
  methods: { action: action("clicked") }
});

export const withAvatar = () => ({
  components: { Avatar },
  data() {
    return {
      user: {
        email: "admin@example.com",
        name: "Admin Adminsson",
        avatar:
          "https://secure.gravatar.com/avatar/51080e0995ac006f056d4dd17b049de5?s=80&r=g&d=404"
      }
    };
  },
  template: `<Avatar :user="user" />`,
  methods: { action: action("clicked") }
});

export const withName = () => ({
  components: { Avatar },
  data() {
    return {
      user: {
        email: "admin@example.com",
        name: "John D.",
        avatar:
          "https://secure.gravatar.com/avatar/51080e0995ac006f056d4dd17b049de5?s=80&r=g&d=404"
      }
    };
  },
  template: `<Avatar :show-name="true" :user="user" />`,
  methods: { action: action("clicked") }
});
