<script setup lang="ts">
  // Тестовые данные корзины
  const cartItems = shallowRef([
    {
      id: `1`,
      name: `Диван "Комфорт"`,
      price: 45000,
      quantity: 1,
    },
    {
      id: `2`,
      name: `Стол обеденный "Классик"`,
      price: 18000,
      quantity: 1,
    },
    {
      id: `3`,
      name: `Кресло "Уют"`,
      price: 22000,
      quantity: 2,
    },
  ]);

  // Вычисляемые свойства
  const subtotal = computed(() => {
    return cartItems.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  });

  const totalItems = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  const deliveryCost = computed(() => {
    return subtotal.value > 50000 ? 0 : 2000;
  });

  const total = computed(() => {
    return subtotal.value + deliveryCost.value;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(`ru-RU`, {
      style: `currency`,
      currency: `RUB`,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const placeOrder = () => {
    // Здесь будет логика оформления заказа
    console.log(`Оформление заказа...`);
  };

  // SEO
  const config = useRuntimeConfig();

  useHead({
    title: `Оформление заказа - ${config.public.siteName}`,
    meta: [
      {
        name: `description`,
        content: `Оформление заказа. Заполните данные для доставки и оплаты.`,
      },
      {
        property: `og:title`,
        content: `Оформление заказа - ${config.public.siteName}`,
      },
      {
        property: `og:description`,
        content: `Оформление заказа. Заполните данные для доставки и оплаты.`,
      },
    ],
  });
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Хлебные крошки -->
    <UiBreadcrumb class="mb-8">
      <UiBreadcrumbList>
        <UiBreadcrumbItem>
          <UiBreadcrumbLink as-child>
            <NuxtLink to="/">Главная</NuxtLink>
          </UiBreadcrumbLink>
        </UiBreadcrumbItem>

        <UiBreadcrumbSeparator />

        <UiBreadcrumbItem>
          <UiBreadcrumbLink as-child>
            <NuxtLink to="/cart">Корзина</NuxtLink>
          </UiBreadcrumbLink>
        </UiBreadcrumbItem>

        <UiBreadcrumbSeparator />

        <UiBreadcrumbItem>
          <span class="text-foreground font-medium">Оформление заказа</span>
        </UiBreadcrumbItem>
      </UiBreadcrumbList>
    </UiBreadcrumb>

    <!-- Заголовок -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Оформление заказа</h1>
      <p class="text-muted-foreground">
        Заполните данные для оформления заказа
      </p>
    </div>

    <!-- Основной контент -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Форма заказа -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Контактные данные -->
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Контактные данные</UiCardTitle>
          </UiCardHeader>
          <UiCardContent class="space-y-4">
            <div class="space-y-2">
              <UiLabel for="firstName">ФИО *</UiLabel>
              <UiInput
                id="firstName"
                type="text"
                placeholder="Введите ФИО"
              />
            </div>
            <div class="space-y-2">
              <UiLabel for="email">Email *</UiLabel>
              <UiInput
                id="email"
                type="email"
                placeholder="example@email.com"
              />
            </div>
            <div class="space-y-2">
              <UiLabel for="phone">Телефон *</UiLabel>
              <UiInput
                id="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          </UiCardContent>
        </UiCard>

        <!-- Адрес доставки -->
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Адрес доставки</UiCardTitle>
          </UiCardHeader>
          <UiCardContent class="space-y-4">
            <div class="space-y-2">
              <UiLabel for="city">Город *</UiLabel>
              <UiInput
                id="city"
                placeholder="Введите город"
              />
            </div>
            <div class="space-y-2">
              <UiLabel for="address">Адрес *</UiLabel>
              <UiInput
                id="address"
                placeholder="Улица, дом, квартира"
              />
            </div>
            <div class="space-y-2">
              <UiLabel for="postalCode">Индекс</UiLabel>
              <UiInput
                id="postalCode"
                placeholder="123456"
              />
            </div>
            <div class="space-y-2">
              <UiLabel for="comment">Комментарий к заказу</UiLabel>
              <UiTextarea
                id="comment"
                placeholder="Дополнительная информация"
              />
            </div>
          </UiCardContent>
        </UiCard>

        <!-- Способ оплаты -->
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Способ оплаты</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <UiRadioGroup
              value="card"
              class="space-y-3"
            >
              <div class="flex items-center space-x-2">
                <UiRadioGroupItem
                  id="card"
                  value="card"
                />
                <UiLabel for="card">Онлайн оплата</UiLabel>
              </div>
              <div class="flex items-center space-x-2">
                <UiRadioGroupItem
                  id="cash"
                  value="cash"
                />
                <UiLabel for="cash">Наличными при получении</UiLabel>
              </div>
            </UiRadioGroup>
          </UiCardContent>
        </UiCard>
      </div>

      <div class="lg:col-span-1">
        <UiCard class="sticky top-8">
          <UiCardHeader>
            <UiCardTitle>Итоги заказа</UiCardTitle>
          </UiCardHeader>
          <UiCardContent class="space-y-4">
            <!-- Список товаров -->
            <div class="space-y-3">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex justify-between items-center text-sm"
              >
                <div class="flex-1">
                  <div class="font-medium">{{ item.name }}</div>
                  <div class="text-muted-foreground">
                    {{ item.quantity }} шт. × {{ formatPrice(item.price) }}
                  </div>
                </div>
                <div class="font-medium">
                  {{ formatPrice(item.price * item.quantity) }}
                </div>
              </div>
            </div>

            <!-- Разделитель -->
            <div class="border-t pt-4">
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Товары ({{ totalItems }})</span>
                  <span>{{ formatPrice(subtotal) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>Доставка</span>
                  <span>
                    {{
                      deliveryCost === 0
                        ? `Бесплатно`
                        : formatPrice(deliveryCost)
                    }}
                  </span>
                </div>
                <div class="border-t pt-2">
                  <div class="flex justify-between font-semibold">
                    <span>Итого к оплате</span>
                    <span>{{ formatPrice(total) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Кнопка оформления -->
            <UiButton
              class="w-full"
              size="lg"
              @click="placeOrder"
            >
              Оформить заказ
              <Icon
                name="mdi:arrow-right"
                class="h-4 w-4 ml-2"
              />
            </UiButton>

            <!-- Дополнительная информация -->
            <div class="text-xs text-muted-foreground space-y-2">
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
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
