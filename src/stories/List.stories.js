import List from '../components/list/List.vue';
import ListItem from '../components/list/ListItem.vue';
import Icon from '../components/core/Icon.vue';

export default {
  title: 'Core/List',
  component: List,
};

const Template = (args) => ({
  components: {List, ListItem, Icon},
  setup() {
    return {args};
  },
  template: `
    <List v-bind="args">
    <ListItem title="Item 1" description="Lorem ipsum dolor" href="https://google.com" target="_blank">
      <template #before>
          <Icon name="home" />
      </template>

      <template #after>
        <Icon name="plus" />
      </template>
    </ListItem>
    <ListItem title="Item 2" description="Lorem ipsum dolor" @click="() => action('Clicked')">
      <template #before>
          <a href="#">
            <Icon name="eye" />
          </a>
      </template>
    </ListItem>
    <ListItem title="Item 3" description="Lorem ipsum dolor">
      <template #before>
        <Icon name="gallery" />
      </template>
    </ListItem>
    </List>`
});

export const Default = Template.bind({});
export const Items = Template.bind({});
Items.args = {
  items: [
    {
      title: 'You can click me!',
      description: 'Lorem ipsum dolor sit amet',
      onClick(e) {
        console.log(e)
      }
    },
    {title: 'Cool list item', description: 'Lorem ipsum dolor sit amet'},
    {title: 'Cool list item', description: 'Lorem ipsum dolor sit amet'},
    {title: 'Cool list item', description: 'Lorem ipsum dolor sit amet'},
  ]
}

