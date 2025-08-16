<script lang="ts" setup>
  const config = useRuntimeConfig();

  const { data } = useFetch<CatalogResponse>(`/api/products/`, {
    baseURL: config.public.apiUrl,
  });
</script>

<template>
  <div>
    <pre>{{ data }}</pre>
    <ModuleCatalog />
  </div>
</template>

<style></style>
