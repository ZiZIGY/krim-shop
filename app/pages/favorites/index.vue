<script lang="ts" setup>
  const config = useRuntimeConfig();

  const favorites = useLocalStorage<number[]>('favorites', []);

  const { data, status } = useFetch<{ results: Product[]; missing: [] }>(
    '/api/products/by-ids',
    {
      query: {
        ids: favorites.value.join(','),
      },
      baseURL: config.public.apiUrl,
      server: false,
    }
  );

  useHead({
    title: `Избранное - ${config.public.siteName}`,
    meta: [
      {
        name: 'description',
        content: `Ваши избранные товары интернет магазина - ${config.public.siteName}`,
      },
      {
        property: `og:title`,
        content: `Избранное - ${config.public.siteName}`,
      },
      {
        property: `og:description`,
        content: `Ваши избранные товары интернет магазина - ${config.public.siteName}`,
      },
    ],
  });
</script>

<template>
  <section class="container mx-auto px-4 py-12">
    <div
      class="grid gap-6 transition-all duration-300 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
    >
      <template v-if="status === 'success'">
        <ModuleCatalogCard
          v-for="product in data?.results"
          :key="product.id"
          :product="product"
        />
      </template>
      <template v-else>
        <UiCardSkeleton
          v-for="value in 24"
          :key="value"
        />
      </template>
    </div>
  </section>
</template>

<style></style>
