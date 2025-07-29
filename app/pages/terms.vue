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
          <span class="text-foreground font-medium">Условия использования</span>
        </UiBreadcrumbItem>
      </UiBreadcrumbList>
    </UiBreadcrumb>

    <!-- Заголовок -->
    <motion.div
      class="mb-12"
      :initial="{ opacity: 0, y: 20 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6 }"
    >
      <h1 class="text-4xl font-bold mb-4">Условия использования</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        Настоящие условия использования регулируют порядок использования сайта {{ $config.public.siteName }} и предоставления услуг.
      </p>
    </motion.div>

    <!-- Основной контент -->
    <motion.div
      class="space-y-12"
      :initial="{ opacity: 0, y: 20 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: 0.1 }"
    >
      <!-- Общие положения -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.2 }"
      >
        <h2 class="text-2xl font-semibold">1. Общие положения</h2>
        <div class="space-y-4 text-muted-foreground">
          <p>
            Используя сайт {{ $config.public.siteName }}, вы соглашаетесь с настоящими условиями использования.
          </p>
          <p>
            Мы оставляем за собой право изменять эти условия в любое время. Изменения вступают в силу с момента их публикации на сайте.
          </p>
          <p>
            Продолжение использования сайта после внесения изменений означает согласие с новыми условиями.
          </p>
        </div>
      </motion.section>

      <!-- Регистрация и аккаунт -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.3 }"
      >
        <h2 class="text-2xl font-semibold">2. Регистрация и аккаунт</h2>
        <div class="space-y-4 text-muted-foreground">
          <p>При регистрации на сайте вы обязуетесь:</p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Предоставлять достоверную информацию</li>
            <li>Не передавать данные аккаунта третьим лицам</li>
            <li>Своевременно обновлять контактную информацию</li>
            <li>Не использовать аккаунт для незаконной деятельности</li>
          </ul>
          <p>
            Мы оставляем за собой право заблокировать аккаунт при нарушении условий использования.
          </p>
        </div>
      </motion.section>

      <!-- Заказы и оплата -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.4 }"
      >
        <h2 class="text-2xl font-semibold">3. Заказы и оплата</h2>
        <div class="space-y-4 text-muted-foreground">
          <p>Порядок оформления заказов:</p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Заказ считается оформленным после подтверждения оплаты</li>
            <li>Цены указаны в рублях и включают НДС</li>
            <li>Мы оставляем за собой право изменить цены без предварительного уведомления</li>
            <li>Оплата производится банковскими картами или наличными при получении</li>
          </ul>
        </div>
      </motion.section>

      <!-- Доставка -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.5 }"
      >
        <h2 class="text-2xl font-semibold">4. Доставка</h2>
        <div class="space-y-4 text-muted-foreground">
          <p>Условия доставки:</p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Доставка осуществляется в течение 2-3 рабочих дней</li>
            <li>Бесплатная доставка при заказе от 50 000 рублей</li>
            <li>Стоимость доставки рассчитывается индивидуально</li>
            <li>Возможен самовывоз из нашего магазина</li>
            <li>При получении заказа проверяйте товар на соответствие заказу</li>
          </ul>
        </div>
      </motion.section>

      <!-- Возврат и обмен -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.6 }"
      >
        <h2 class="text-2xl font-semibold">5. Возврат и обмен</h2>
        <div class="space-y-4 text-muted-foreground">
          <p>Условия возврата:</p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Возврат товара возможен в течение 14 дней с момента получения</li>
            <li>Товар должен быть в оригинальной упаковке и без следов использования</li>
            <li>Возврат денежных средств производится в течение 10 рабочих дней</li>
            <li>Расходы по возврату товара несет покупатель</li>
            <li>Товары надлежащего качества возврату не подлежат</li>
          </ul>
        </div>
      </motion.section>

      <!-- Интеллектуальная собственность -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.7 }"
      >
        <h2 class="text-2xl font-semibold">6. Интеллектуальная собственность</h2>
        <div class="space-y-4 text-muted-foreground">
          <p>
            Все материалы сайта (тексты, изображения, дизайн) являются интеллектуальной собственностью {{ $config.public.siteName }}.
          </p>
          <p>
            Запрещается копирование, воспроизведение или распространение материалов сайта без письменного разрешения.
          </p>
        </div>
      </motion.section>

      <!-- Ограничение ответственности -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.8 }"
      >
        <h2 class="text-2xl font-semibold">7. Ограничение ответственности</h2>
        <div class="space-y-4 text-muted-foreground">
          <p>
            {{ $config.public.siteName }} не несет ответственности за:
          </p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Неправильное использование товаров</li>
            <li>Ущерб, причиненный третьим лицам</li>
            <li>Потерю данных по вине пользователя</li>
            <li>Действия служб доставки</li>
          </ul>
        </div>
      </motion.section>

      <!-- Контакты -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.9 }"
      >
        <h2 class="text-2xl font-semibold">8. Контакты</h2>
        <div class="space-y-4 text-muted-foreground">
          <p>
            По всем вопросам, связанным с условиями использования, обращайтесь:
          </p>
          <div class="space-y-2">
            <p>Email: {{ $config.public.email }}</p>
            <p>Телефон: {{ $config.public.phoneNumber }}</p>
            <p>Адрес: {{ $config.public.address }}</p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  </div>
</template>

<script setup lang="ts">
  import { motion } from 'motion-v';

  // SEO
  useHead({
    title: 'Условия использования - МебельМаркет',
    meta: [
      {
        name: 'description',
        content: 'Условия использования сайта МебельМаркет. Правила и порядок предоставления услуг.',
      },
      { property: 'og:title', content: 'Условия использования - МебельМаркет' },
      {
        property: 'og:description',
        content: 'Условия использования сайта МебельМаркет. Правила и порядок предоставления услуг.',
      },
    ],
  });
</script>

<style scoped></style> 