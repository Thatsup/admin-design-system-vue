import { configure } from '@storybook/vue';
import { addParameters } from '@storybook/vue';

import '../src/assets/sass/all.scss';
import '../src/assets/storybook.css';

addParameters({
    backgrounds: [
        { name: 'Gray 300', value: '#f1f3f4', default: true },
        { name: 'Gray 500', value: '#cecece' },
    ],
    // options: {
    //     storySort: (a, b) =>
    //         a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, { numeric: true }),
    // },
});

// automatically import all files ending in *.stories.js
// automatically import all files ending in *.stories.js
configure(
    [
        // require.context('../stories', true, /\.stories\.mdx$/),
        require.context('../stories', true, /\.stories\.js$/),
    ],
    module
);

// configure(require.context('../stories', true, /\.stories\.js$/), module);
