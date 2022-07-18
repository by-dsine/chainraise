module.exports = {
   content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
   ],
   theme: {
      extend: {
         colors: {
            'cr-primary': '#4b1dff',
            'cr-secondary': '#59c9e9',
         },
      },
   },
   corePlugins: {
      aspectRatio: false,
   },
   plugins: [
      require('flowbite/plugin'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
   ],
};
