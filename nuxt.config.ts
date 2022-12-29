// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL,
    },
  },
});
