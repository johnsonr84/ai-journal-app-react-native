import { POST } from "../app/api/chat+api";

// Vercel Edge Function shim:
// - The deployed web app calls `/api/chat`
// - Expo Router's API route lives at `app/api/chat+api.ts`
// This file bridges the two so Vercel deploys an actual `/api/chat` endpoint.
export const config = {
    runtime: "edge",
};

export default async function handler(req: Request): Promise<Response> {
    if (req.method !== "POST") {
        return new Response("Method Not Allowed", {
            status: 405,
            headers: { Allow: "POST" },
        });
    }

    return POST(req);
}


