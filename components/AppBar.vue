<script lang="ts" setup>
const user = useSupabaseUser();
const handleLogout = async () => {
  const { auth } = useSupabaseAuthClient();
  try {
    await auth.signOut();
    navigateTo("/");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div
    class="backdrop-blur-md border-b border-white/20 fixed top-0 left-0 right-0"
  >
    <nav class="container mx-auto py-4 flex justify-between items-center">
      <NuxtLink to="/" class="navbar-brand text-2xl font-bold text-white">
        tnyl
      </NuxtLink>
      <ul class="flex items-center">
        <li class="mr-6 text-xs">
          <nuxt-link v-if="user" :to="{ name: 'dashboard' }" class="btn"
            >Dashboard</nuxt-link
          >
          <nuxt-link
            v-else
            :to="{
              name: 'auth',
            }"
            class="btn"
            >Signin</nuxt-link
          >
        </li>
        <li v-if="user" class="grid place-content-center">
          <button @click="handleLogout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
