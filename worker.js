export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/store") {
      const { message } = await request.json();
      if (!message) return new Response("Message required", { status: 400 });

      const id = crypto.randomUUID();
      await env.ONE_TIME_MESSAGES.put(id, message);

      return new Response(JSON.stringify({ id }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (request.method === "GET" && url.pathname.startsWith("/retrieve/")) {
      const id = url.pathname.split("/").pop();
      const message = await env.ONE_TIME_MESSAGES.get(id);

      if (!message) return new Response("Message not found", { status: 404 });

      await env.ONE_TIME_MESSAGES.delete(id); // Delete after retrieval

      return new Response(JSON.stringify({ message }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};

