// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
})

// Tamagui Metro integration can be memory hungry in CI builds.
// Allow opting out for Vercel/CI via env var (build will still work, but with less optimization).
if (process.env.TAMAGUI_DISABLE === '1') {
  module.exports = config
} else {
  // add nice web support with optimizing compiler + CSS extraction
  const { withTamagui } = require('@tamagui/metro-plugin')
  module.exports = withTamagui(config, {
    components: ['tamagui'],
    // Use a CJS config so Tamagui can load it during static extraction on Vercel.
    config: './tamagui.config.cjs',
    outputCSS: './tamagui-web.css',
    cssInterop: true,
  })
}