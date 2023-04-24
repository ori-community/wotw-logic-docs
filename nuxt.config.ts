// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
  modules: [
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    // https://nuxt.com/modules/nuxt-monaco-editor
    "nuxt-monaco-editor",
  ],
  content: {
    markdown: {
      anchorLinks: {
        depth: 0,
        exclude: [1, 2, 3, 4, 5, 6],
      }, // you are supposed to be able to set this to false but that doesn't seem to work properly, so this is the verbose variant of setting it to false
      toc: {
        depth: 3,
      },
    },
  },
});
