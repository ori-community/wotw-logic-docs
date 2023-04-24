<template>
  <main>
    <header>
      <h1 class="title">{{ article?.title }}</h1>
    </header>
    <div class="article-grid">
      <article>
        <ContentRenderer v-if="article" :value="article" />
      </article>
      <aside v-if="!article?.hideSidebar">
        <div class="sticky">
          <div class="sidebar">
            <NuxtLink
              v-for="article in sidebarArticles"
              :key="article._path"
              class="button"
              :to="article._path"
            >
              {{ article.sidebarTitle || article.title }}
            </NuxtLink>
            <ul v-if="links.length > 0" class="toc">
              <li v-for="link of links" :key="link.id">
                <NuxtLink
                  :to="`#${link.id}`"
                  class="item"
                  :class="`indent-${link.depth - minTocLevel}`"
                >
                  {{ link.text }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  </main>
</template>

<script setup lang="ts">
import { callWithNuxt } from "#app";

// don't try to render before having the article, else we would be missing the heading elements that links lead to
const { data: article } = await useAsyncData(() => {
  const { params } = useRoute();
  return queryContent(
    Array.isArray(params.slug) ? params.slug.join("/") : params.slug
  ).findOne();
});

const links = computed(() => {
  if (article.value) {
    type Link = {
      depth: number;
      id: string;
      text: string;
      children?: Link[];
    };

    const flattenLinks = (links: Link[]): Link[] =>
      links.flatMap((link) =>
        link.children ? [link, ...flattenLinks(link.children)] : link
      );

    return flattenLinks(article.value.body.toc.links);
  } else {
    return [];
  }
});

const minTocLevel = computed(() =>
  Math.min(...links.value.map((link) => link.depth))
);

const { data: sidebarArticles } = useAsyncData(async () => {
  const nuxtApp = useNuxtApp();
  const sidebar = await queryContent("/sidebar").findOne();
  return callWithNuxt(nuxtApp, () =>
    Promise.all(
      sidebar.sidebar.map((sidebarArticlePath: string) =>
        queryContent(sidebarArticlePath).findOne()
      )
    )
  ) as any;
});
</script>

<style lang="scss" scoped>
@import "assets/style/framework";

header {
  display: flex;
  align-items: center;

  @include screen(sm) {
    flex-direction: column-reverse;

    .search-bar {
      margin-left: 0 !important;
    }
  }

  .title {
    display: inline-block;
  }

  .search-bar {
    margin-left: 1em;
  }
}

.article-grid {
  display: flex;
  gap: 2em;

  @include screen(sm) {
    flex-direction: column;
  }

  aside {
    min-width: 12em;

    .sticky {
      position: sticky;
      margin-top: 1em;
      top: 0;

      .sidebar {
        display: flex;
        flex-direction: column;
        max-height: 100vh;

        .toc {
          list-style: none;
          padding-left: 0;
          padding-bottom: 1em;
          margin-bottom: 1em;
          border-bottom: 1px solid var(--color-background-light);
          transition: border-bottom-color 200ms;
          overflow: auto;

          .item {
            display: block;
            line-height: 1.3em;
            padding: 0.2em 0;

            @for $i from 1 through 6 {
              &.indent-#{$i} {
                padding-left: $i * 0.5em;
                font-size: 0.9em;
              }
            }
          }
        }

        .button {
          margin-bottom: 0.2em;
          padding: 0.4em 0.6em;
        }
      }
    }
  }
}
</style>
