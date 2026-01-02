import Constants from "expo-constants";

export const generateAPIUrl = (relativePath: string) => {
  // Web: use the current origin (Vercel/production) so `/api/*` works.
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}${relativePath}`;
  }

  // Native / Expo Go: fall back to the experience URL.
  const origin = Constants.experienceUrl?.replace("exp://", "http://");
  if (!origin) return relativePath;
  return `${origin}${relativePath}`;
};
