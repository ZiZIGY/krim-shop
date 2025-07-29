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
          <span class="text-foreground font-medium">Условия оплаты</span>
        </UiBreadcrumbItem>
      </UiBreadcrumbList>
    </UiBreadcrumb>

    <!-- Заголовок -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold mb-4">Условия оплаты</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        Мы предлагаем удобные и безопасные способы оплаты для покупки мебели.
        Все платежи защищены современными технологиями безопасности.
      </p>
    </div>

    <!-- Основной контент -->
    <motion.div
      class="space-y-8"
      :initial="{ opacity: 0, y: 20 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6 }"
    >
      <!-- Способы оплаты -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.1 }"
      >
        <h2 class="text-2xl font-semibold">Способы оплаты</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <!-- Банковские карты -->
          <UiCard class="p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon
                name="mdi:credit-card"
                class="h-6 w-6 text-primary"
              />
              <h3 class="text-lg font-semibold">Банковские карты</h3>
            </div>
            <p class="text-muted-foreground mb-4">
              Оплата картами Visa, MasterCard, МИР через защищенное соединение.
            </p>
            <div class="flex gap-2">
              <Icon
                name="mdi:credit-card"
                class="h-8 w-12 text-blue-600"
              />
              <Icon
                name="mdi:credit-card"
                class="h-8 w-12 text-red-600"
              />
              <Icon
                name="mdi:credit-card"
                class="h-8 w-12 text-green-600"
              />
            </div>
          </UiCard>

          <!-- Электронные кошельки -->
          <UiCard class="p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon
                name="mdi:wallet"
                class="h-6 w-6 text-primary"
              />
              <h3 class="text-lg font-semibold">Электронные кошельки</h3>
            </div>
            <p class="text-muted-foreground mb-4">
              Оплата через Яндекс.Деньги, QIWI, WebMoney и другие системы.
            </p>
            <div class="flex gap-2">
              <Icon
                name="mdi:wallet"
                class="h-8 w-8 text-yellow-600"
              />
              <Icon
                name="mdi:wallet"
                class="h-8 w-8 text-orange-600"
              />
            </div>
          </UiCard>

          <!-- Наложенный платеж -->
          <UiCard class="p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon
                name="mdi:cash"
                class="h-6 w-6 text-primary"
              />
              <h3 class="text-lg font-semibold">Наложенный платеж</h3>
            </div>
            <p class="text-muted-foreground mb-4">
              Оплата при получении товара курьеру или в пункте выдачи.
            </p>
            <div class="flex gap-2">
              <Icon
                name="mdi:truck-delivery"
                class="h-8 w-8 text-green-600"
              />
            </div>
          </UiCard>

          <!-- Банковский перевод -->
          <UiCard class="p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon
                name="mdi:bank"
                class="h-6 w-6 text-primary"
              />
              <h3 class="text-lg font-semibold">Банковский перевод</h3>
            </div>
            <p class="text-muted-foreground mb-4">
              Перевод на расчетный счет компании с подтверждением оплаты.
            </p>
            <div class="flex gap-2">
              <Icon
                name="mdi:bank"
                class="h-8 w-8 text-blue-600"
              />
            </div>
          </UiCard>
        </div>
      </motion.section>

      <!-- Безопасность -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.2 }"
      >
        <h2 class="text-2xl font-semibold">Безопасность платежей</h2>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="text-center space-y-3">
            <div
              class="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
            >
              <Icon
                name="mdi:shield-check"
                class="h-6 w-6 text-primary"
              />
            </div>
            <h3 class="font-semibold">SSL-шифрование</h3>
            <p class="text-sm text-muted-foreground">
              Все данные передаются по защищенному соединению
            </p>
          </div>

          <div class="text-center space-y-3">
            <div
              class="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
            >
              <Icon
                name="mdi:lock"
                class="h-6 w-6 text-primary"
              />
            </div>
            <h3 class="font-semibold">PCI DSS</h3>
            <p class="text-sm text-muted-foreground">
              Соответствие международным стандартам безопасности
            </p>
          </div>

          <div class="text-center space-y-3">
            <div
              class="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
            >
              <Icon
                name="mdi:eye-off"
                class="h-6 w-6 text-primary"
              />
            </div>
            <h3 class="font-semibold">Конфиденциальность</h3>
            <p class="text-sm text-muted-foreground">
              Ваши данные не передаются третьим лицам
            </p>
          </div>
        </div>
      </motion.section>

      <!-- Условия -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.3 }"
      >
        <h2 class="text-2xl font-semibold">Условия оплаты</h2>

        <div class="space-y-4">
          <div class="flex gap-4 p-4 bg-muted/30 rounded-lg">
            <Icon
              name="mdi:check-circle"
              class="h-5 w-5 text-green-600 mt-0.5"
            />
            <div>
              <h3 class="font-semibold mb-1">Предоплата</h3>
              <p class="text-sm text-muted-foreground">
                При заказе товара в наличии оплата производится сразу при
                оформлении заказа.
              </p>
            </div>
          </div>

          <div class="flex gap-4 p-4 bg-muted/30 rounded-lg">
            <Icon
              name="mdi:check-circle"
              class="h-5 w-5 text-green-600 mt-0.5"
            />
            <div>
              <h3 class="font-semibold mb-1">Оплата при получении</h3>
              <p class="text-sm text-muted-foreground">
                Возможна оплата наличными или картой при доставке товара.
              </p>
            </div>
          </div>

          <div class="flex gap-4 p-4 bg-muted/30 rounded-lg">
            <Icon
              name="mdi:check-circle"
              class="h-5 w-5 text-green-600 mt-0.5"
            />
            <div>
              <h3 class="font-semibold mb-1">Рассрочка</h3>
              <p class="text-sm text-muted-foreground">
                Возможна покупка в рассрочку от 3 до 12 месяцев без переплат.
              </p>
            </div>
          </div>

          <div class="flex gap-4 p-4 bg-muted/30 rounded-lg">
            <Icon
              name="mdi:check-circle"
              class="h-5 w-5 text-green-600 mt-0.5"
            />
            <div>
              <h3 class="font-semibold mb-1">Возврат средств</h3>
              <p class="text-sm text-muted-foreground">
                Возврат денежных средств в течение 14 дней с момента покупки.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <!-- Контакты и полезные ссылки -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.4 }"
      >
        <h2 class="text-2xl font-semibold">Остались вопросы?</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Контакты -->
          <UiCard class="p-6">
            <h3 class="text-lg font-semibold mb-4">Свяжитесь с нами</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <Icon
                  name="mdi:phone"
                  class="h-4 w-4 text-primary"
                />
                <a
                  :href="`tel:${$config.public.phoneNumber}`"
                  class="text-sm hover:text-primary transition-colors"
                >
                  {{ $config.public.phoneNumber }}
                </a>
              </div>
              <div class="flex items-center gap-3">
                <Icon
                  name="mdi:email"
                  class="h-4 w-4 text-primary"
                />
                <a
                  :href="`mailto:${$config.public.email}`"
                  class="text-sm hover:text-primary transition-colors"
                >
                  {{ $config.public.email }}
                </a>
              </div>
              <div class="flex items-center gap-3">
                <Icon
                  name="mdi:clock-outline"
                  class="h-4 w-4 text-primary"
                />
                <span class="text-sm text-muted-foreground">
                  {{ $config.public.workTime }}
                </span>
              </div>
            </div>
          </UiCard>

          <!-- Полезные ссылки -->
          <UiCard class="p-6">
            <h3 class="text-lg font-semibold mb-4">Полезные ссылки</h3>
            <nav class="space-y-2">
              <NuxtLink
                to="/delivery"
                class="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Условия доставки
              </NuxtLink>
              <NuxtLink
                to="/return"
                class="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Возврат и обмен
              </NuxtLink>
              <NuxtLink
                to="/warranty"
                class="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Гарантия
              </NuxtLink>
              <NuxtLink
                to="/faq"
                class="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Часто задаваемые вопросы
              </NuxtLink>
            </nav>
          </UiCard>
        </div>
      </motion.section>
    </motion.div>
  </div>
</template>

<script setup lang="ts">
  import { motion } from 'motion-v';

  // SEO
  useHead({
    title: 'Условия оплаты - МебельМаркет',
    meta: [
      {
        name: 'description',
        content:
          'Удобные и безопасные способы оплаты мебели. Банковские карты, электронные кошельки, наложенный платеж. SSL-шифрование и PCI DSS.',
      },
      { property: 'og:title', content: 'Условия оплаты - МебельМаркет' },
      {
        property: 'og:description',
        content: 'Удобные и безопасные способы оплаты мебели',
      },
    ],
  });
</script>

<style scoped></style>
