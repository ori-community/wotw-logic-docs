<template>
  <div>
    <ul>
      <li v-for="page in articles">
        <NuxtLink :to="page._path">{{ page.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ byPath: string }>();

const { data: articles } = useAsyncData(() => {
  return queryContent(props.byPath)
    .where({ _path: { $ne: props.byPath } })
    .only(["title", "_path"])
    .find();
});
</script>
