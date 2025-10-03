<script setup lang="ts">
  const { items, set, remove } = useCart();
  const config = useRuntimeConfig();

  const { data } = useFetch<{ results: Product[]; missing: [] }>(
    '/api/products/by-ids',
    {
      query: { ids: items.value.map((i) => i.id).join(',') },
      baseURL: config.public.apiUrl,
      server: false,
    }
  );

  watch(
    () => data.value,
    (newData) => {
      if (newData?.results && items.value.length > 0) {
        const existingIds = new Set(newData.results.map((p) => p.id));
        const itemsToKeep = items.value.filter((item) =>
          existingIds.has(item.id)
        );

        if (itemsToKeep.length !== items.value.length) {
          items.value = itemsToKeep;
        }
      }
    },
    { immediate: true }
  );

  const cartItems = computed(() => {
    if (!data.value) return [];
    return items.value
      .map(({ id, count }) => {
        const product = data.value!.results.find((p) => p.id === id);
        return product ? { product, quantity: count } : null;
      })
      .filter(
        (item): item is { product: Product; quantity: number } => item !== null
      );
  });

  const updateQuantity = (productId: number, newQuantity: number) => {
    set(productId, newQuantity);
  };

  const removeItem = (productId: number) => {
    remove(productId);
  };
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Корзина</h1>
      <p class="text-muted-foreground">
        Товаров в корзине: {{ cartItems.length }} шт.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Список товаров -->
      <div class="lg:col-span-2 space-y-4">
        <ModuleCartCard
          v-for="item in cartItems"
          :key="item.product.id"
          :product="item.product"
          :quantity="item.quantity"
          @update-quantity="updateQuantity"
          @remove-item="removeItem"
        />
      </div>

      <ModuleCartSummary :items="cartItems" />
    </div>
  </div>
</template>
