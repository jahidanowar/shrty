type UserAgent = {
  userAgent: string;
  ip?: string;
};

export default function useUserAgent(): UserAgent | null {
  if (process.server) {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event.req) {
      const ip =
        nuxtApp.ssrContext.event.req.headers["x-forwarded-for"] ||
        nuxtApp.ssrContext.event.req.connection.remoteAddress || // for local dev
        nuxtApp.ssrContext.event.req.socket.remoteAddress;

      const ua = nuxtApp.ssrContext.event.req.headers["user-agent"];

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
