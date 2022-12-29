import { useNuxtApp } from "#app";
import { sendRedirect } from "h3";

/**
 * Performs an external redirect in a Nuxt3 route middleware. Once this Nuxt3
 * pull request is merged, this function can be removed in favor of navigateTo:
 *
 * https://github.com/nuxt/framework/pull/5022
 *
 * @param url - An external url to redirect to
 * @param code - An HTTP status code, 301 by default.
 * @returns
 */
export default function useExternalRedirect(
  url: string,
  code = 301
): never | Promise<void> {
  if (/^https?:\/\//.test(url)) {
    if (process.server) {
      const nuxtApp = useNuxtApp();
      if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
        return nuxtApp.callHook("app:redirected").then(() => {
          if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
            return sendRedirect(nuxtApp.ssrContext.event, url, code);
          }
        });
      }
    } else {
      window.location.href = url;
    }
  }
  throw new Error("Cannot redirect to invalid URL.");
}
