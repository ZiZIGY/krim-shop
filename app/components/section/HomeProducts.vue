<script lang="ts" setup>
  const { tagSlug } = defineProps<{
    tagSlug: string;
    tagName: string;
  }>();

  const config = useRuntimeConfig();

  const { data } = await useFetch<ApiProductsResponse>('/api/products', {
    baseURL: config.public.apiUrl,
    query: {
      tag: tagSlug,
    },
  });
</script>
<template>
  <WidgetShowcase
    v-slot="{ item }"
    :items="data?.results.results"
    item-key="id"
    :slider-title="capitalizeFirstLetter(tagName)"
  >
    <ModuleCatalogCard :product="item" />
  </WidgetShowcase>
</template>

<style></style>
