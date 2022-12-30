<script lang="ts" setup>
const { id } = useRoute().params;

const config = useRuntimeConfig();

const { data } = await useLinks().getLink(id as string);

if (!data.value) {
  throw createError({
    statusCode: 404,
    message: "Link not found",
  });
}
</script>

<template>
  <section v-if="data" class="pt-32 container">
    <div>
      <div class="flex">
        <h1 class="text-2xl font-bold text-amber-500">/{{ data.key }}</h1>
        <CopyBtn
          :data="config.public.appUrl + '/' + data.key"
          class="ml-5 px-3"
        />
      </div>
      <div class="mt-2">{{ data.created_at }}</div>
    </div>

    <div class="stats flex mt-10 flex-wrap md:flex-nowrap">
      <div class="card">
        <div class="text-4xl font-bold text-white">{{ data.total_clicks }}</div>
        <div class="text-white/50">Total Clicks</div>
      </div>
      <div class="card mt-5 md:mt-0 md:ml-5 w-full relative">
        <textarea
          :value="data.long_url"
          class="w-full bg-transparent focus:outline-none appearance-none resize-none"
        ></textarea>
        <CopyBtn :data="data.long_url" class="p-5 absolute right-2 bottom-2" />
      </div>
    </div>

    <div class="clicks mt-10">
      <div v-for="click in data.clicks" class="card w-full mb-5">
        <template v-if="click && typeof click === 'object'">
          <div class="flex justify-between">
            <div class="div">
              <div class="text-amber-500">{{ click.ip }}</div>
              <div class="text-white/50">{{ click.created_at }}</div>
            </div>
            <div class="div">
              <div v-if="click.country">Country: {{ click.country }}</div>
              <div v-if="click.city">City: {{ click.city }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
