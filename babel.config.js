module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ...(process.env.TAMAGUI_DISABLE === "1"
        ? []
        : [
            [
              "@tamagui/babel-plugin",
              {
                components: ["tamagui"],
                // Use a CJS config so Tamagui can load it during static extraction on Vercel.
                config: "./tamagui.config.cjs",
                logTimings: true,
                // Static extraction can be very memory hungry (especially in CI/Vercel).
                // Allow explicitly disabling it via env var.
                disableExtraction:
                  process.env.NODE_ENV === "development" ||
                  process.env.TAMAGUI_DISABLE_EXTRACTION === "1",
              },
            ],
          ]),

      // NOTE: this is only necessary if you are using reanimated for animations
      "react-native-reanimated/plugin",
    ],
  };
};
