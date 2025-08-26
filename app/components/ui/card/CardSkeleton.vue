<script setup lang="ts"></script>

<template>
  <UiCard
    class="group overflow-hidden transition-all duration-300 h-full flex flex-col py-0 gap-0"
  >
    <!-- Скелетон изображения -->
    <div class="relative overflow-hidden">
      <UiSkeleton class="h-48 w-full rounded-t-lg" />
    </div>
    <!-- Контент скелетона -->
    <div class="flex-1 flex flex-col p-4">
      <div class="flex-1">
        <UiSkeleton class="h-4 w-3/4 mb-2" />
        <UiSkeleton class="h-3 w-1/3 mb-3" />
        <div class="flex items-center gap-2 mb-3">
          <UiSkeleton class="w-4 h-4 rounded-full" />
          <UiSkeleton class="h-3 w-1/4" />
        </div>
        <UiSkeleton class="h-3 w-2/3" />
      </div>
      <div class="flex items-end gap-2 mb-3">
        <UiSkeleton class="h-5 w-1/4" />
        <UiSkeleton class="h-3 w-1/6" />
      </div>
      <div class="flex gap-2">
        <UiSkeleton class="h-8 w-full rounded" />
      </div>
    </div>
  </UiCard>
</template>
