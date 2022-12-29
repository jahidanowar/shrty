<script lang="ts" setup>
import { Database } from "~~/types/supabase";

useHead({
  title: "Dashboard",
});
definePageMeta({
  middleware: ["auth"],
});

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

const { data, refresh } = useAsyncData("links", async () => {
  // Get all links and count the total clicks for each link (using the `count` aggregate function)
  const { data } = await client
    .from("links")
    .select("*")
    .eq("user_id", user.value?.id)
    .order("created_at", { ascending: false });
  return data;
});

const handleRefresh = (newLink: any) => {
  refresh();
};
</script>

<template>
  <section class="pt-28 container mx-auto">
    <h1 class="text-2xl font-bold text-white">Dashboard</h1>
    <LinkForm @shorten="handleRefresh" />
    <div class="links-wrapper mt-10">
      <LinkCard v-for="link in data" :key="link.id" :link="link"> </LinkCard>
    </div>
  </section>
</template>
