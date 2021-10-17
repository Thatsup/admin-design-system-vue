import '../src/assets/storybook.css'
import "../src/assets/styles/variables.css";
import "minireset.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'Gray 300',
    values: [
      { name: 'White', value: '#ffffff' },
      { name: 'Gray 300', value: 'var(--gray-300)' },
      { name: 'Gray 500', value: 'var(--gray-500)' },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
