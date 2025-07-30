<template>
  <UiCard class="p-0">
    <UiCardContent class="p-4">
      <div class="flex gap-4">
        <!-- Изображение товара (левая секция) -->
        <div class="flex-shrink-0">
          <div class="w-24 h-24 bg-primary/10 rounded-lg overflow-hidden">
            <NuxtImg
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Детали товара (центральная секция) -->
        <div class="flex-1 min-w-0">
          <!-- Header с названием и ценой -->
          <header class="flex items-start justify-between mb-3">
            <div>
              <NuxtLink
                :to="`/product/${item.id}`"
                class="text-sm font-medium line-clamp-2 hover:text-primary transition-colors mb-1"
              >
                {{ item.name }}
              </NuxtLink>
              <p class="text-sm text-muted-foreground">({{ item.category }})</p>
            </div>

            <!-- Цена -->
            <div class="text-right">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xl font-bold text-primary">{{
                  formatPrice(item.price)
                }}</span>
              </div>
              <div class="text-sm text-muted-foreground line-through">
                {{ formatPrice(item.price * 1.27) }}
              </div>
            </div>
          </header>

          <!-- Спецификации -->
          <UiAccordion
            type="single"
            collapsible
            class="w-full"
          >
            <UiAccordionItem value="specifications">
              <UiAccordionTrigger
                class="text-sm font-medium text-primary hover:no-underline"
              >
                Все параметры
              </UiAccordionTrigger>
              <UiAccordionContent>
                <div class="space-y-2 text-sm">
                  <div
                    class="flex justify-between items-center py-1 border-b border-border/50"
                  >
                    <span class="text-muted-foreground">Ширина</span>
                    <span>150 см</span>
                  </div>
                  <div
                    class="flex justify-between items-center py-1 border-b border-border/50"
                  >
                    <span class="text-muted-foreground">Высота</span>
                    <span>250 см</span>
                  </div>
                  <div
                    class="flex justify-between items-center py-1 border-b border-border/50"
                  >
                    <span class="text-muted-foreground">Глубина</span>
                    <span>50 см</span>
                  </div>
                  <div class="flex justify-between items-center py-1">
                    <span class="text-muted-foreground">Цвет (визуальный)</span>
                    <span>Белый</span>
                  </div>
                </div>
              </UiAccordionContent>
            </UiAccordionItem>
          </UiAccordion>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between pt-4">
        <!-- Кнопки действий -->
        <div class="flex gap-2">
          <WidgetFavorite
            :product-id="item.id"
            class="w-10 h-10"
          />
          <UiButton
            size="icon"
            variant="secondary"
            class="h-10 w-10 transition-all duration-200 text-muted-foreground hover:text-destructive"
            @click="$emit('remove-item', item.id)"
          >
            <Icon
              name="mdi:delete"
              class="h-5 w-5"
            />
          </UiButton>
        </div>

        <!-- Счетчик количества -->
        <UiNumberField
          :value="item.quantity"
          :min="1"
          class="w-32"
          invert-wheel-change
          @update:value="updateQuantity"
        >
          <UiNumberFieldDecrement />
          <UiNumberFieldInput />
          <UiNumberFieldIncrement />
        </UiNumberField>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script setup lang="ts">
  interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
  }

  interface Props {
    item: CartItem;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    'update-quantity': [itemId: string, quantity: number];
    'remove-item': [itemId: string];
  }>();

  const updateQuantity = (newQuantity: number) => {
    emit('update-quantity', props.item.id, newQuantity);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };
</script>

<style scoped></style>
