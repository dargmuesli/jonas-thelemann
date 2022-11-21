const colors = require('tailwindcss/colors')

function heading(theme) {
  return {
    fontWeight: theme('fontWeight.bold'),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}

function prose(theme) {
  return {
    css: {
      a: {
        color: theme('colors.link'),
        textDecoration: 'none',
      },
      h1: {
        lineHeight: theme('lineHeight.snug'),
      },
      h2: {
        lineHeight: theme('lineHeight.snug'),
      },
      h3: {
        lineHeight: theme('lineHeight.snug'),
      },
      h4: {
        lineHeight: theme('lineHeight.snug'),
      },
      h5: {
        lineHeight: theme('lineHeight.snug'),
      },
      h6: {
        lineHeight: theme('lineHeight.snug'),
      },
    },
  }
}

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.js',
    './nuxt.config.ts',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addBase, addComponents, theme }) {
      addBase({
        h1: {
          ...heading(theme),
          fontSize: theme('fontSize.4xl'),
          textAlign: 'center',
        },
        h2: {
          ...heading(theme),
          fontSize: theme('fontSize.3xl'),
        },
        h3: {
          ...heading(theme),
          fontSize: theme('fontSize.2xl'),
        },
        h4: {
          ...heading(theme),
          fontSize: theme('fontSize.xl'),
        },
        h5: {
          ...heading(theme),
          fontSize: theme('fontSize.lg'),
        },
        h6: {
          ...heading(theme),
        },
      })
      addComponents({
        '.object-position-custom': {
          objectPosition: '0% 30%',
        },
      })
    },
  ],
  theme: {
    extend: {
      colors: {
        link: colors.blue['700'],
      },
      screens: {
        12: { raw: '(min-aspect-ratio: 2/1)' },
      },
      typography: (theme) => ({
        DEFAULT: prose(theme),
        sm: prose(theme),
        base: prose(theme),
        lg: prose(theme),
        xl: prose(theme),
        '2xl': prose(theme),
      }),
    },
  },
}
