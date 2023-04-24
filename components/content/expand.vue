<template>
  <div @click="show = !show" class="heading">
    <a>
      <ContentSlot :use="$slots.default" />
    </a>
  </div>
  <div ref="outer" class="expand">
    <div ref="inner">
      <ContentSlot :use="$slots.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
const show = ref(false);
const outer: Ref<HTMLElement | null> = ref(null);
const inner: Ref<HTMLElement | null> = ref(null);

watchEffect(() => {
  if (outer.value && inner.value) {
    const height = show.value ? getComputedStyle(inner.value).height : "0";
    outer.value.style.height = height;
  }
});
</script>

<style scoped>
.heading > a {
  text-decoration: none;
}
.expand {
  transition: height 0.5s;
  overflow-y: clip;
  height: 0;
}
</style>
