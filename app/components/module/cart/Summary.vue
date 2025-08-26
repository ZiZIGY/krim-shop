<script setup lang="ts">
  interface Props {
    items: { product: Product; quantity: number }[];
  }

  const props = defineProps<Props>();

  defineEmits<{
    'proceed-to-checkout': [];
  }>();

  // Вычисляемые свойства
  const subtotal = computed(() => {
    return props.items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );
  });

  const totalItems = computed(() => {
    return props.items.reduce((sum, item) => sum + item.quantity, 0);
  });

  const deliveryCost = computed(() => {
    return subtotal.value > 50000 ? 0 : 2000; // Бесплатная доставка от 50k
  });

  const total = computed(() => {
    return subtotal.value + deliveryCost.value;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };
</script>

<template>
  <div class="lg:col-span-1">
    <div class="sticky top-[8.625rem] bg-background border rounded-lg p-6">
      <div class="mb-4">
        <h3 class="text-lg font-semibold">Итого</h3>
      </div>

      <div class="space-y-4">
        <!-- Стоимость товаров -->
        <div class="flex justify-between">
          <span class="text-sm text-muted-foreground">
            Товары ({{ totalItems }})
          </span>
          <span class="font-medium">{{ formatPrice(subtotal) }}</span>
        </div>

        <!-- Доставка -->
        <div class="flex justify-between">
          <span class="text-sm text-muted-foreground">Доставка</span>
          <span class="font-medium">{{
            deliveryCost === 0 ? 'Бесплатно' : formatPrice(deliveryCost)
          }}</span>
        </div>

        <!-- Разделитель -->
        <div class="border-t pt-4">
          <div class="flex justify-between text-lg font-semibold">
            <span>Итого к оплате</span>
            <span>{{ formatPrice(total) }}</span>
          </div>
        </div>

        <!-- Кнопка оформления -->
        <NuxtLink to="/cart/checkout">
          <UiButton
            class="w-full"
            size="lg"
            :disabled="items.length === 0"
          >
            Перейти к оформлению
            <Icon
              name="mdi:arrow-right"
              class="h-4 w-4 ml-2"
            />
          </UiButton>
        </NuxtLink>

        <!-- Дополнительная информация -->
        <div class="text-xs text-muted-foreground space-y-2 mt-4">
          <div class="flex items-center gap-2">
            <Icon
              name="mdi:shield-check"
              class="h-3 w-3"
            />
            <span>Безопасная оплата</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon
              name="mdi:refresh"
              class="h-3 w-3"
            />
            <span>Возврат в течение 14 дней</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
