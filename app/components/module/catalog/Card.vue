<script setup lang="ts">
  interface Props {
    product: Product;
  }

  const props = defineProps<Props>();

  const currentPrice = computed(() => {
    if (props.product.discount_percent && props.product.discount_price) {
      return (
        parseFloat(props.product.discount_price) *
        (1 - props.product.discount_percent / 100)
      );
    }
    return parseFloat(props.product.price);
  });

  const { add, set, getCount } = useCart();

  const cartQuantity = computed(() => getCount(props.product.id));
  const isInCart = computed(() => cartQuantity.value > 0);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const updateQuantity = (quantity: number) => {
    if (quantity === 0) {
      set(props.product.id, 0);
    } else {
      set(props.product.id, quantity);
    }
  };

  const addToCart = () => {
    add(props.product.id);
  };
</script>

<template>
  <UiCard
    class="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col py-0 gap-0"
  >
    <div class="relative overflow-hidden">
      <NuxtImg
        :src="product.image"
        :alt="product.title"
        class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div
        class="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ClientOnly>
          <WidgetFavorite :product-id="Number(product.id)" />
        </ClientOnly>

        <NuxtLink :to="`/product/${product.slug}`">
          <UiButton
            size="icon"
            variant="secondary"
            class="h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <Icon
              name="mdi:eye-outline"
              class="h-3.5 w-3.5"
            />
          </UiButton>
        </NuxtLink>

        <div
          v-if="isInCart"
          class="h-7 w-7 bg-background/80 backdrop-blur-sm rounded flex items-center justify-center"
        >
          <Icon
            name="mdi:cart-check"
            class="h-3.5 w-3.5 text-primary"
          />
        </div>
      </div>

      <div
        v-if="!product.stock"
        class="absolute inset-0 bg-background/80 flex items-center justify-center"
      >
        <span class="text-muted-foreground font-medium text-sm">
          Нет в наличии
        </span>
      </div>
    </div>

    <div class="flex-1 flex flex-col p-4">
      <div class="flex-1">
        <NuxtLink
          :to="`/product/${product.slug}`"
          class="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors mb-1"
        >
          {{ product.title }}
        </NuxtLink>
        <p class="text-xs text-muted-foreground mb-2">
          {{ product.sku }}
        </p>

        <div class="space-y-0.5 text-xs text-muted-foreground mb-3">
          <div
            v-if="product.color"
            class="flex gap-2 items-center"
          >
            <div
              class="size-5 shadow rounded"
              :style="{ backgroundColor: product.color_hex }"
            />
            {{ product.color_name }}
          </div>
          <p>
            {{ Number(product.width) }} x {{ Number(product.height) }} x
            {{ Number(product.depth) }} см
          </p>
        </div>
      </div>

      <div class="flex items-end gap-2 mb-3">
        <span class="text-lg font-bold text-primary">
          {{ formatPrice(currentPrice) }} ₽
        </span>
        <span
          v-if="
            product.discount_price && product.discount_price !== product.price
          "
          class="text-xs text-muted-foreground line-through"
        >
          {{ formatPrice(parseFloat(product.discount_price)) }} ₽
        </span>
      </div>

      <div class="flex gap-2">
        <UiButton
          v-if="!isInCart"
          size="sm"
          class="flex-1 text-xs"
          :disabled="!product.stock"
          @click="addToCart"
        >
          <Icon
            name="bx-basket"
            class="text-base mr-1"
          />
          Завтра
        </UiButton>
        <div
          v-else
          class="flex-1 flex items-center gap-2"
        >
          <UiNumberField
            :model-value="cartQuantity"
            :min="0"
            :max="99"
            class="flex-1"
            invert-wheel-change
            @update:model-value="updateQuantity"
          >
            <UiNumberFieldContent>
              <UiNumberFieldDecrement />
              <UiNumberFieldInput class="text-xs text-center" />
              <UiNumberFieldIncrement />
            </UiNumberFieldContent>
          </UiNumberField>
        </div>
      </div>
    </div>
  </UiCard>
</template>
