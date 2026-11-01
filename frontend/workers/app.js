export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      const target = new URL(request.url);
      target.protocol = "https:";
      target.hostname = "hdenlinger9440.pythonanywhere.com";
      target.port = "";
      return fetch(new Request(target, request));
    }
    return env.ASSETS.fetch(request);
  },
};