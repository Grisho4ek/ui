### Setup Tailwind CSS

Install Tailwind CSS:

```bash
npm i autoprefixer postcss tailwindcss
npx tailwindcss init -p
```

Point Tailwind CSS to files you have `className=".."` in:

### Add path to node_modules/countx-ui

```javascript
module.exports = {
  content: [
    './node_modules/countx-ui/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Add Tailwind CSS to a CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Try it out

How you use Flowbite React depends on your project setup. In general, you can just import the components you want to use from `flowbite-react` and use them in a React `.jsx` file:

```tsx
import { Tooltip } from 'countx-ui';

export default function MyPage() {
  return (
    <Tooltip content='Awesome!'>
      <div>Hover me</div>
    </Tooltip>
  );
}
```
