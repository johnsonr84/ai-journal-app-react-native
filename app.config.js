// Expo supports JS-based config via app.config.js. This allows using env vars.
module.exports = {
  expo: {
    name: "Innerloop",
    slug: "ai-journal-app-react-native",
    version: "1.0.0",

    runtimeVersion: { policy: "sdkVersion" },
    updates: {
      url: "https://u.expo.dev/d5e33202-1ecb-442f-a719-4885485dcf11",
    },

    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "innerloop",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.johnsonr84.innerloop",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },

    android: {
      package: "com.johnsonr84.innerloop",
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },

    web: {
      output: "server",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: { backgroundColor: "#000000" },
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: false,
    },

    extra: {
      eas: {
        projectId: "d5e33202-1ecb-442f-a719-4885485dcf11",
      },
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "",
    },
  },
};
