import Tabs from '../components/tabs/Tabs.vue';
import Tab from '../components/tabs/Tab.vue';

export default {
  title: 'Core/Tabs',
  component: { Tabs, Tab },
  argTypes: {
  },
};

const Template = (args) => ({
  components: { Tabs, Tab },
  setup() {
    return { args };
  },
  template: `
    <Tabs>
      <Tab
        title="Dashboard"
        v-bind="args"
      >
        Hello World
      </Tab>

      <Tab
        title="Settings"
        :active="true"
        v-bind="args"
      >
        Lorem ipsum dolor sit amet
      </Tab>

      <Tab
        title="User"
        v-bind="args"
      >
        Lorem ipsum dolor
      </Tab>
    </Tabs>
  `,
});

export const Default = Template.bind({});
