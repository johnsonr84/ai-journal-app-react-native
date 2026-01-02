import { POST } from "../app/api/categorize+api";

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


