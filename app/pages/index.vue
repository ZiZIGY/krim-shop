<script lang="ts" setup>
  const config = useRuntimeConfig();

  useHead({
    title: `Главная - ${config.public.siteName}`,
    meta: [
      {
        name: `description`,
        content: `Главная страница ${config.public.siteName}. Качественная мебель для дома и офиса.`,
      },
      { property: `og:title`, content: `Главная - ${config.public.siteName}` },
      {
        property: `og:description`,
        content: `Главная страница ${config.public.siteName}. Качественная мебель для дома и офиса.`,
      },
    ],
  });

  const { data: tags } = await useFetch<Tag[]>('/api/tags', {
    query: {
      home: 1,
    },
    baseURL: config.public.apiUrl,
  });
</script>

<template>
  <div>
    <SectionHero />
    <SectionHomeProducts
      v-for="tag in tags"
      :key="tag.id"
      :tag-name="tag.name"
      :tag-slug="tag.slug"
    />
    <SectionDiscountForm />
    <SectionPopularCategories />
  </div>
</template>

<style></style>
