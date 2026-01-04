# 🧠✨ AI-Powered Journal App  
### *(Expo + Sanity + Clerk + OpenAI)*

[![Expo SDK 54](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react)](https://reactnative.dev/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?logo=sanity)](https://www.sanity.io/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk)](https://clerk.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?logo=openai)](https://openai.com/)
[![Tamagui](https://img.shields.io/badge/Tamagui-UI-000000)](https://tamagui.dev/)
[![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1)](https://zod.dev/)

An **AI-powered journaling app** built with **Expo (React Native)**, **Sanity CMS**, **Clerk authentication + billing**, **Tamagui**, and **OpenAI**—designed to help users reflect, build consistency, and gain insight from their thoughts.

- 📱 **Mobile-first** — iOS and Android are the primary experience  
- 🌐 **Web for billing** — subscription management via Clerk web routes  
  (`/pricing`, `/plan-changed-success`)

---

## ✨ Core Features

- 📝 **Journal Entries**  
  Optional title, mood tracking, rich text content, and image attachments.

- 🗓️ **Daily Prompts**  
  Swipeable prompt cards with refresh and “start entry” flows to reduce friction.

- 🤖 **AI Chat Companion**  
  Therapeutic-style chat that can reference and reason over your journal history.

- 🧠 **Auto-Categorization**  
  AI suggests an existing category—or creates a new one automatically.

- 🔥 **Streak Tracking**  
  Current and longest streaks with milestone-based encouragement.

- 🔐 **Auth + Billing**  
  Clerk-powered sign-in/sign-up and plan-based feature gating  
  (`<Protect plan="pro" />`).

---

## 🖼️ Screenshots

| 🏠 Home | 🤖 AI Chat |
| --- | --- |
| ![Home screen](docs/screenshots/home.png) | ![AI chat screen](docs/screenshots/ai-chat.png) |

| 📚 Entries | 👤 Profile |
| --- | --- |
| ![Entries list screen](docs/screenshots/entries.png) | ![Profile screen](docs/screenshots/profile.png) |

| 💳 Pricing (Web) |
| --- |
| ![Pricing screen](docs/screenshots/subscription.png) |

---

## 🗂️ Repository Structure

- 📱 **Expo App** — `app/` (Expo Router)
- 🧑‍🎨 **Sanity Studio** — `sanity/`
- 🔌 **Sanity Client & Queries** — `lib/sanity/`
- 🛠️ **Shared Utilities** — `lib/utils/`
- 🧪 **Sample Import Data** — `sample_data/`
- 📘 **Developer Guides** — `help/`

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js 18+
- npm
- iOS Simulator (macOS + Xcode) and/or Android Emulator (Android Studio)
- Accounts:
  - 🔐 Clerk (auth + billing)
  - 🧠 Sanity (CMS)
  - 🤖 OpenAI (AI chat & categorization)

---

## 📦 Install Dependencies

Install dependencies for **both** the Expo app and Sanity Studio:

```bash
# Expo app
npm install

# Sanity Studio
cd sanity
npm install
cd ..
```

---

## 🔐 Environment Variables

This project uses **two environment files**.

### 1️⃣ Expo App — `.env` (project root)

Create `.env` in the project root:

```env
# Clerk
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# Sanity
EXPO_PUBLIC_SANITY_PROJECT_ID=yourProjectId
EXPO_PUBLIC_SANITY_DATASET=production

# ⚠️ Currently referenced client-side
# Move writes behind API routes before public launch
EXPO_PUBLIC_SANITY_TOKEN=yourSanityWriteToken

# OpenAI (used by Expo API routes)
OPENAI_API_KEY=sk-...
```

---

### 2️⃣ Sanity Studio — `sanity/.env.local`

```env
SANITY_STUDIO_SANITY_PROJECT_ID=yourProjectId
SANITY_STUDIO_SANITY_DATASET=production

# Optional (for authenticated Studio actions)
SANITY_STUDIO_SANITY_TOKEN=yourSanityToken
```

---

## ▶️ Running Locally

### 1️⃣ Start the Expo App

```bash
npx expo start
```

- Press `i` for iOS
- Press `a` for Android
- Press `w` for web (primarily used for billing)

### 2️⃣ Start Sanity Studio

```bash
cd sanity
npm run dev
```

Sanity Studio runs at:  
👉 `http://localhost:3333`

---

## 📥 Sanity: Import Sample Data (Optional)

Sample datasets are provided in `sample_data/`:

- `sample-categories.ndjson`
- `sample-daily-prompts.ndjson`
- `test-journal-entries.ndjson` (great for AI chat testing)

Import into your dataset:

```bash
cd sanity
npx sanity dataset import ../sample_data/sample-categories.ndjson production
npx sanity dataset import ../sample_data/sample-daily-prompts.ndjson production
npx sanity dataset import ../sample_data/test-journal-entries.ndjson production
```

---

## 🔌 API Routes (Expo)

Located in `app/api/`:

- **POST `/api/chat`**
  - Streams responses using the Vercel AI SDK
  - Can fetch and reason over journal entries

- **POST `/api/categorize`**
  - Uses structured output (`zod` + `generateObject`)
  - Suggests or creates categories automatically

---

## 💳 Billing & Pricing (Web)

- Pricing page: `app/pricing.tsx`
- Success redirect: `app/plan-changed-success.tsx`
- Deep link scheme (configured in `app.config.ts`):
  - `scheme: "sanityclerkbillingjournalappexpo"`

---

## 🧰 Helpful Docs

- 🤖 AI chat testing — `help/AI-CHAT-TESTING.md`
- 🧠 Auto-categorization — `help/AUTO-CATEGORIZATION.md`
- 🖼️ Image setup — `help/SETUP-IMAGES.md`, `help/IMAGE-SETUP-OFFICIAL.md`

---

## 🛠️ Troubleshooting

- **Metro cache issues**:

```bash
npx expo start -c
```

- **Sanity Studio env errors**:  
  Ensure `SANITY_STUDIO_SANITY_PROJECT_ID` and  
  `SANITY_STUDIO_SANITY_DATASET` are set in `sanity/.env.local`.

- **OpenAI errors**:  
  Confirm `OPENAI_API_KEY` exists in the root `.env`.

---

✨ *Built to encourage reflection, consistency, and clarity—with modern mobile UX and clean, maintainable architecture.*

## 👨‍💻 Author

**Robert Johnson**  
Full-Stack Software Engineer  
https://robertjohnsonportfolio.com