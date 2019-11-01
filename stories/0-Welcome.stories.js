import Welcome from "./Welcome";

export default {
  title: "Intro | Intro to"
};

export const toStorybook = () => ({
  components: { Welcome },
  template: "<welcome />"
});

toStorybook.story = {
  name: "the Design system"
};
