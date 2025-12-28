const { defaultConfig } = require('@tamagui/config/v4')
const { createTamagui, createTokens } = require('tamagui')

// Keep this file CJS/JS-only so Tamagui's static extractor can load it during
// `expo export` (Vercel build) without tripping over TS/ESM parsing issues.

const customTokens = createTokens({
  color: {
    purple1: '#faf5ff',
    purple2: '#f3e8ff',
    purple3: '#e9d5ff',
    purple4: '#d8b4fe',
    purple5: '#c084fc',
    purple6: '#a855f7',
    purple7: '#9333ea',
    purple8: '#7e22ce',
    purple9: '#904BFF',
    purple10: '#6b21a8',
    purple11: '#581c87',
    purple12: '#3b0764',
  },
  radius: defaultConfig.tokens.radius,
  zIndex: defaultConfig.tokens.zIndex,
  space: defaultConfig.tokens.space,
  size: defaultConfig.tokens.size,
})

const baseTheme = defaultConfig.themes.light_blue

const config = {
  ...defaultConfig,
  tokens: customTokens,
  themes: {
    ...defaultConfig.themes,
    purple: {
      ...baseTheme,
      background: '#904BFF',
      backgroundHover: '#7e22ce',
      backgroundPress: '#6b21a8',
      backgroundFocus: '#904BFF',
      color: '#ffffff',
      colorHover: '#ffffff',
      colorPress: '#ffffff',
      colorFocus: '#ffffff',
      borderColor: '#904BFF',
      borderColorHover: '#7e22ce',
      borderColorPress: '#6b21a8',
      borderColorFocus: '#904BFF',
    },
  },
}

const tamaguiConfig = createTamagui(config)

module.exports = tamaguiConfig
module.exports.tamaguiConfig = tamaguiConfig


