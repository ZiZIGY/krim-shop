<script lang="ts" setup>
  import { useCatalog } from '../../composables/catalog';

  const { filters } = useCatalog();
</script>

<template>
  <div>
    <ModuleCatalog :filters="filters" />
  </div>
</template>

<style></style>
