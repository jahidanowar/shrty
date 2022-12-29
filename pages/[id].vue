<script lang="ts" setup>
import geoip from "geoip-lite";
import { Database } from "~~/types/supabase";

const client = useSupabaseClient<Database>();
const params = useRoute().params;

const { data } = await client
  .from("links")
  .select("*")
  .eq("key", params.id)
  .single();

if (data) {
  const clickData: any = {};

  const ua = useUserAgent();

  if (ua) {
    clickData.user_agent = ua.userAgent;
    clickData.ip = ua.ip;

    if (ua.ip) {
      const geo = geoip.lookup(ua.ip);
      if (geo) {
        clickData.country = geo.country;
        clickData.city = geo.city;
      }
    }
  }

  await client.from("clicks").insert({
    link_id: data.id,
    ...clickData,
  });
  useExternalRedirect(data.long_url, 302);
} else {
  throw createError({
    statusCode: 404,
    message: "Link not found",
  });
}
</script>

<template>
  <div class="grid place-content-center h-screen">Redirecting...</div>
</template>
