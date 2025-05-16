// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const flumensTailwind = require('@flumens/tailwind/tailwind.config.js');

const primary = {
  // https://www.tailwindshades.com/#color=322.5882352941176%2C84.15841584158416%2C39.6078431372549&step-up=10&step-down=11&hue-shift=0&name=red-violet&base-stop=6&v=1&overrides=e30%3D  DEFAULT: '#BA107A',
  DEFAULT: '#BA107A',
  50: '#FDE6F4',
  100: '#FBCEEA',
  200: '#F79FD6',
  300: '#F370C2',
  400: '#EF41AD',
  500: '#E91499',
  600: '#BA107A',
  700: '#860C58',
  800: '#530736',
  900: '#1F0314',
  950: '#050003',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    'node_modules/@flumens/ionic/dist/**/*.{js,ts,jsx,tsx}',
    'node_modules/@flumens/tailwind/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      ...flumensTailwind.theme?.extend,

      colors: {
        primary,

        secondary: {
          // https://www.tailwindshades.com/#color=41.48148148148148%2C99.18367346938776%2C48.03921568627451&step-up=9&step-down=13&hue-shift=0&name=yellow-sea&base-stop=6&v=1&overrides=e30%3D          DEFAULT: '#F4A901',
          DEFAULT: '#F4A901',
          50: '#FFFBF3',
          100: '#FFF4DC',
          200: '#FFE6AE',
          300: '#FED880',
          400: '#FEC953',
          500: '#FEBB25',
          600: '#F4A901',
          700: '#B27B01',
          800: '#704E00',
          900: '#2E2000',
          950: '#0D0900',
        },

        tertiary: {
          // https://www.tailwindshades.com/#color=235.14450867052025%2C100%2C66.07843137254902&step-up=6&step-down=17&hue-shift=0&name=dodger-blue&base-stop=6&v=1&overrides=e30%3D          DEFAULT: '#5260FF',
          DEFAULT: '#5260FF',
          50: '#FAFBFF',
          100: '#EBEDFF',
          200: '#CCD0FF',
          300: '#AEB4FF',
          400: '#8F98FF',
          500: '#717CFF',
          600: '#5260FF',
          700: '#0014FA',
          800: '#000DA4',
          900: '#00064D',
          950: '#000322',
        },

        success: {
          // https://www.tailwindshades.com/#color=128.25396825396825%2C100%2C37.05882352941177&step-up=11&step-down=10&hue-shift=0&name=malachite&base-stop=6&v=1&overrides=e30%3D
          DEFAULT: '#00BD1A',
          50: '#F3FFF4',
          100: '#D7FFDC',
          200: '#9EFFAC',
          300: '#66FF7B',
          400: '#2EFF4B',
          500: '#00F522',
          600: '#00BD1A',
          700: '#008A13',
          800: '#00570C',
          900: '#002405',
          950: '#000B01',
        },

        warning: {
          // https://www.tailwindshades.com/#color=28.826815642458104%2C74.89539748953973%2C46.86274509803921&step-up=9&step-down=11&hue-shift=0&name=hot-cinnamon&base-stop=6&v=1&overrides=e30%3D
          DEFAULT: '#D1741E',
          50: '#FDF5EF',
          100: '#FAEADB',
          200: '#F4D2B3',
          300: '#EEBA8A',
          400: '#E9A362',
          500: '#E38B3A',
          600: '#D1741E',
          700: '#A05917',
          800: '#6F3E10',
          900: '#3E2209',
          950: '#251505',
        },

        danger: {
          // https://www.tailwindshades.com/#color=0%2C85.36585365853658%2C59.80392156862745&step-up=7&step-down=15&hue-shift=0&name=flamingo&base-stop=6&v=1&overrides=e30%3D
          DEFAULT: '#F04141',
          50: '#FEF7F7',
          100: '#FDE6E6',
          200: '#FAC5C5',
          300: '#F8A4A4',
          400: '#F58383',
          500: '#F36262',
          600: '#F04141',
          700: '#D41111',
          800: '#8D0B0B',
          900: '#460606',
          950: '#230303',
        },
      },
    },
  },
  plugins: flumensTailwind.plugins,
};
