<script lang="ts" setup>
  useHead({
    title: 'Главная - МебельМаркет',
    meta: [
      {
        name: 'description',
        content:
          'Главная страница МебельМаркет. Качественная мебель для дома и офиса.',
      },
      { property: 'og:title', content: 'Главная - МебельМаркет' },
      {
        property: 'og:description',
        content:
          'Главная страница МебельМаркет. Качественная мебель для дома и офиса.',
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
