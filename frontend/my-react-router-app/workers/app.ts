interface Env {
  ASSETS: Fetcher;
  BACKEND: Fetcher;
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      return env.BACKEND.fetch(request);   // goes to Django
    }
    return env.ASSETS.fetch(request);      // everything else is your React app
  },
} satisfies ExportedHandler<Env>;