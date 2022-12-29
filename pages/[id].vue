<script lang="ts" setup>
const params = useRoute().params;
await useLinks().redirect(params.id as string);
</script>

<template>
  <div class="grid place-content-center h-screen">Redirecting...</div>
</template>
