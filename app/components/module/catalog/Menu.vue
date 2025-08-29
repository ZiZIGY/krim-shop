<script setup lang="ts"></script>

<template>
  <NuxtLink
    to="/catalog"
    class="hidden lg:block"
  >
    <UiButton class="gap-2 !flex group">
      <Icon
        name="mdi:menu"
        class="h-5 w-5"
      />
      <span class="font-medium">Каталог</span>
    </UiButton>
  </NuxtLink>
</template>

<style scoped></style>
