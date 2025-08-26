<script setup lang="ts">
  const props = defineProps<{
    product: Product;
    quantity: number;
  }>();

  const emit = defineEmits<{
    'update-quantity': [productId: number, quantity: number];
    'remove-item': [productId: number];
  }>();

  const updateQuantity = (newQuantity: number) => {
    emit('update-quantity', props.product.id, newQuantity);
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(Number(price));
  };
</script>

<template>
  <UiCard class="p-0">
    <UiCardContent class="p-4">
      <div class="flex gap-4">
        <!-- Изображение товара -->
        <div class="flex-shrink-0">
          <div class="w-24 h-24 bg-primary/10 rounded-lg overflow-hidden">
            <NuxtImg
              :src="product.image"
              :alt="product.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <!-- Детали товара -->
        <div class="flex-1 min-w-0">
          <header class="flex items-start justify-between mb-3">
            <div>
              <NuxtLink
                :to="`/product/${product.slug}`"
                class="text-sm font-medium line-clamp-2 hover:text-primary transition-colors mb-1"
              >
                {{ product.title }}
              </NuxtLink>
              <p class="text-sm text-muted-foreground">
                ({{ product.category_slug || product.category }})
              </p>
            </div>
            <div class="text-right">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xl font-bold text-primary">
                  {{ formatPrice(product.price) }}
                </span>
              </div>
              <div
                v-if="
                  product.discount_price &&
                  product.discount_price !== product.price
                "
                class="text-sm text-muted-foreground line-through"
              >
                {{ formatPrice(product.discount_price) }}
              </div>
            </div>
          </header>
          <!-- Характеристики -->
          <div class="space-y-0.5 text-xs text-muted-foreground mb-3">
            <div
              v-if="product.color_name"
              class="flex gap-2 items-center"
            >
              <div
                class="size-5 shadow rounded"
                :style="{ backgroundColor: product.color_hex }"
              />
              {{ product.color_name }}
            </div>
            <p>
              {{ product.width }} x {{ product.height }} x
              {{ product.depth }} см
            </p>
          </div>
        </div>
      </div>
      <!-- Actions -->
      <div class="flex items-center justify-between pt-4">
        <div class="flex gap-2">
          <ClientOnly>
            <WidgetFavorite
              :product-id="product.id"
              class="w-10 h-10"
            />
          </ClientOnly>
          <UiButton
            size="icon"
            variant="secondary"
            class="h-10 w-10 transition-all duration-200 text-muted-foreground hover:text-destructive"
            @click="$emit('remove-item', product.id)"
          >
            <Icon
              name="mdi:delete"
              class="h-5 w-5"
            />
          </UiButton>
        </div>
        <UiNumberField
          :model-value="quantity"
          :min="1"
          class="w-32"
          invert-wheel-change
          @update:model-value="updateQuantity"
        >
          <UiNumberFieldDecrement />
          <UiNumberFieldInput />
          <UiNumberFieldIncrement />
        </UiNumberField>
      </div>
    </UiCardContent>
  </UiCard>
</template>
