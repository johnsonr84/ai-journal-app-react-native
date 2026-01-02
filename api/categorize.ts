import { POST } from "../app/api/categorize+api";

// Vercel Edge Function shim:
// - The deployed web app calls `/api/categorize`
// - Expo Router's API route lives at `app/api/categorize+api.ts`
// This file bridges the two so Vercel deploys an actual `/api/categorize` endpoint.
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


