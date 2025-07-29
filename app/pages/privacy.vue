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
          <span class="text-foreground font-medium"
            >Политика конфиденциальности</span
          >
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
      <h1 class="text-4xl font-bold mb-4">Политика конфиденциальности</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        Мы заботимся о защите ваших персональных данных и обеспечиваем их
        безопасность в соответствии с законодательством.
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
            Настоящая Политика конфиденциальности определяет порядок обработки
            персональных данных пользователей сайта
            {{ $config.public.siteName }}.
          </p>
          <p>
            Мы собираем только те персональные данные, которые необходимы для
            предоставления услуг и улучшения качества обслуживания.
          </p>
          <p>
            Обработка персональных данных осуществляется в соответствии с
            Федеральным законом "О персональных данных".
          </p>
        </div>
      </motion.section>

      <!-- Сбор информации -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.3 }"
      >
        <h2 class="text-2xl font-semibold">2. Сбор информации</h2>
        <div class="space-y-4 text-muted-foreground">
          <p>Мы собираем следующие виды персональных данных:</p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Контактная информация (имя, email, телефон)</li>
            <li>Адрес доставки</li>
            <li>Информация о заказах</li>
            <li>Данные для оплаты (в зашифрованном виде)</li>
            <li>Техническая информация (IP-адрес, cookies)</li>
          </ul>
        </div>
      </motion.section>

      <!-- Использование информации -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.4 }"
      >
        <h2 class="text-2xl font-semibold">3. Использование информации</h2>
        <div class="space-y-4 text-muted-foreground">
          <p>Собранная информация используется для:</p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Обработки и выполнения заказов</li>
            <li>Связи с клиентами по вопросам заказов</li>
            <li>Улучшения качества обслуживания</li>
            <li>Предоставления технической поддержки</li>
            <li>Анализа и оптимизации работы сайта</li>
          </ul>
        </div>
      </motion.section>

      <!-- Защита данных -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.5 }"
      >
        <h2 class="text-2xl font-semibold">4. Защита данных</h2>
        <div class="space-y-4 text-muted-foreground">
          <p>
            Мы принимаем все необходимые меры для защиты ваших персональных
            данных от несанкционированного доступа, изменения, раскрытия или
            уничтожения.
          </p>
          <p>Меры защиты включают:</p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Шифрование данных при передаче</li>
            <li>Регулярное обновление систем безопасности</li>
            <li>Ограничение доступа к персональным данным</li>
            <li>Мониторинг систем на предмет угроз</li>
          </ul>
        </div>
      </motion.section>

      <!-- Передача данных -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.6 }"
      >
        <h2 class="text-2xl font-semibold">5. Передача данных третьим лицам</h2>
        <div class="space-y-4 text-muted-foreground">
          <p>
            Мы не передаем ваши персональные данные третьим лицам, за
            исключением случаев:
          </p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li
              >Когда это необходимо для выполнения заказа (службы доставки)</li
            >
            <li>Когда это требуется по закону</li>
            <li>С вашего явного согласия</li>
          </ul>
        </div>
      </motion.section>

      <!-- Права пользователей -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.7 }"
      >
        <h2 class="text-2xl font-semibold">6. Права пользователей</h2>
        <div class="space-y-4 text-muted-foreground">
          <p>Вы имеете право:</p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Получить информацию о том, какие данные мы обрабатываем</li>
            <li>Требовать исправления неточных данных</li>
            <li>Требовать удаления ваших данных</li>
            <li>Отозвать согласие на обработку данных</li>
            <li
              >Обратиться в уполномоченный орган по защите прав субъектов
              персональных данных</li
            >
          </ul>
        </div>
      </motion.section>

      <!-- Контакты -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.8 }"
      >
        <h2 class="text-2xl font-semibold">7. Контакты</h2>
        <div class="space-y-4 text-muted-foreground">
          <p>
            По всем вопросам, связанным с обработкой персональных данных, вы
            можете обратиться к нам:
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
    title: 'Политика конфиденциальности - МебельМаркет',
    meta: [
      {
        name: 'description',
        content:
          'Политика конфиденциальности МебельМаркет. Узнайте, как мы защищаем ваши персональные данные.',
      },
      {
        property: 'og:title',
        content: 'Политика конфиденциальности - МебельМаркет',
      },
      {
        property: 'og:description',
        content:
          'Политика конфиденциальности МебельМаркет. Защита персональных данных.',
      },
    ],
  });
</script>

<style scoped></style>
