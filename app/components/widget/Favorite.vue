<script setup lang="ts">
  interface Props {
    productId: string;
  }

  const props = defineProps<Props>();

  const favorites = useLocalStorage<string[]>('favorites', []);

  const isFavorite = computed(() => {
    return favorites.value.includes(props.productId);
  });

  const toggleFavorite = () => {
    if (isFavorite.value) {
      favorites.value = favorites.value.filter((id) => id !== props.productId);
    } else {
      favorites.value = [...favorites.value, props.productId];
    }
  };

  const iconName = computed(() => {
    return isFavorite.value ? 'mdi:heart' : 'mdi:heart-outline';
  });
</script>

<template>
  <ClientOnly>
    <UiButton
      size="icon"
      variant="secondary"
      class="h-7 w-7 transition-all duration-200"
      :class="{ 'text-red-500': isFavorite }"
      @click="toggleFavorite"
    >
      <Icon
        :name="iconName"
        class="h-3.5 w-3.5"
      />

      <slot :is-favorite="isFavorite" />
    </UiButton>
  </ClientOnly>
</template>
