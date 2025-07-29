<script lang="ts" setup></script>

<template>
  <div class="flex flex-col justify-between min-h-svh">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style></style>
