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
</script>

<template>
  <div>
    <SectionHero />
    <SectionNewProducts />
    <SectionPopularProducts />
    <SectionPopularCategories />
  </div>
</template>

<style></style>
