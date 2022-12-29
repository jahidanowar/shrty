type UserAgent = {
  userAgent: string;
  ip?: string;
};

export default function useUserAgent(): UserAgent | null {
  if (process.server) {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event.node.req) {
      const ip =
        nuxtApp.ssrContext.event.node.req.headers["x-forwarded-for"] ||
        nuxtApp.ssrContext.event.node.req.connection.remoteAddress || // for local dev
        nuxtApp.ssrContext.event.node.req.socket.remoteAddress;

      const ua = nuxtApp.ssrContext.event.node.req.headers["user-agent"];

      return {
        userAgent: ua || "",
        ip: typeof ip === "string" ? ip : undefined,
      };
    }
  } else {
    const ua = navigator.userAgent;
    return {
      userAgent: ua,
      ip: undefined,
    };
  }

  return null;
}
