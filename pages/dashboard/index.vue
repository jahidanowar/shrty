<script lang="ts" setup>
useHead({
  title: "Dashboard",
});
definePageMeta({
  middleware: "auth",
});

const { data, refresh } = await useLinks().getAllLinks();

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
