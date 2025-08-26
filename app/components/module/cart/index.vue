<script setup lang="ts">
  const { items, set, remove } = useCart();
  const config = useRuntimeConfig();

  const { data, pending } = useFetch<{ results: Product[]; missing: [] }>(
    '/api/products/by-ids',
    {
      query: { ids: items.value.map((i) => i.id).join(',') },
      baseURL: config.public.apiUrl,
      server: false,
    }
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
        {{ cartItems.length }} товар{{
          cartItems.length === 1 ? '' : cartItems.length < 5 ? 'а' : 'ов'
        }}
        в корзине
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Список товаров -->
      <div class="lg:col-span-2 space-y-4">
        <template v-if="pending">
          <CardSkeleton
            v-for="n in 3"
            :key="n"
          />
        </template>
        <template v-else>
          <ModuleCartCard
            v-for="item in cartItems"
            :key="item.product.id"
            :product="item.product"
            :quantity="item.quantity"
            @update-quantity="updateQuantity"
            @remove-item="removeItem"
          />
        </template>
      </div>
      <!-- Панель итогов -->
      <ModuleCartSummary :items="cartItems" />
    </div>
  </div>
</template>
