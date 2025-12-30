export default {
  expo: {
    name: "ai-journal-app-react-native",
    slug: "ai-journal-app-react-native",
    version: "1.0.0",

    // Recommended for EAS Updates stability
    runtimeVersion: { policy: "sdkVersion" },

    // ✅ Required for EAS Updates (manual because you're using dynamic config)
    updates: {
      url: "https://u.expo.dev/d5e33202-1ecb-442f-a719-4885485dcf11",
    },

    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "aijournalappreactnative",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
    },

    android: {
      // ✅ Required for Android builds triggered by GitHub integration
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
      // For Vercel hosting: generate a single-page web build (SPA).
      // Web is used mainly for billing/subscription pages in this project.
      output: "single",
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
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
      // Disabled to reduce memory usage during `expo export` (CI/Vercel builds).
      reactCompiler: false,
    },

    // ✅ Required to link your project to EAS
    extra: {
      eas: {
        projectId: "d5e33202-1ecb-442f-a719-4885485dcf11",
      },
    },
  },
};
