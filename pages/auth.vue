<script lang="ts" setup>
definePageMeta({
  middleware: "guest",
});
const config = useRuntimeConfig();
useHead({
  title: "Authenticate",
});
const isLoading = ref(false);
const handleGithubLogin = async () => {
  const { auth } = useSupabaseAuthClient();
  try {
    isLoading.value = true;
    auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000",
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="auth h-screen grid place-content-center">
    <div class="container mx-auto">
      <div
        class="card bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 w-[300px] text-center"
      >
        <div class="text-center flex justify-center">
          <div class="p-4 border rounded-full border-white/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
        </div>
        <button
          class="btn w-full mt-5"
          @click="handleGithubLogin"
          :disabled="isLoading"
        >
          Continue with github
        </button>
      </div>
    </div>
  </div>
</template>
