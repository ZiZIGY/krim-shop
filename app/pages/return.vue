<script setup lang="ts">
  import { motion } from 'motion-v';
  import { Info } from 'lucide-vue-next';

  useHead({
    title: 'Условия возврата и обмена',
    meta: [
      {
        name: 'description',
        content:
          'Условия возврата и обмена товаров. Сроки, документы, правила возврата.',
      },
    ],
  });
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Заголовок страницы -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6 }"
          class="text-center"
        >
          <h1 class="text-4xl font-bold mb-4">Условия возврата и обмена</h1>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            Информация о правилах возврата и обмена товаров
          </p>
        </motion.div>
      </div>
    </section>

    <!-- Основной контент -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6, delay: 0.2 }"
        >
          <h2 class="text-3xl font-bold mb-8">Общие условия</h2>

          <div class="space-y-8">
            <div>
              <h3 class="text-2xl font-semibold mb-4">Сроки возврата</h3>
              <p class="text-lg text-muted-foreground mb-4">
                Согласно Закону "О защите прав потребителей", вы имеете право
                вернуть товар в течение 14 дней с момента покупки, если он не
                подошел по форме, габаритам, фасону, расцветке, размеру или
                комплектации.
              </p>
              <p class="text-lg text-muted-foreground">
                Товар должен быть в товарном виде, с сохранением всех пломб,
                ярлыков, упаковки и документов, подтверждающих покупку.
              </p>
            </div>

            <div>
              <h3 class="text-2xl font-semibold mb-4"
                >Товары, не подлежащие возврату</h3
              >
              <p class="text-lg text-muted-foreground mb-4">
                Согласно Постановлению Правительства РФ от 19.01.1998 № 55,
                возврату не подлежат:
              </p>
              <ul class="space-y-2 text-lg text-muted-foreground ml-6">
                <li
                  >• Товары для профилактики и лечения заболеваний в домашних
                  условиях</li
                >
                <li>• Предметы личной гигиены</li>
                <li>• Парфюмерно-косметические товары</li>
                <li
                  >• Текстильные товары, кабельная продукция, строительные и
                  отделочные материалы</li
                >
                <li>• Швейные и трикотажные изделия, носки, чулки</li>
                <li>• Изделия из драгоценных металлов, драгоценных камней</li>
                <li>• Автомобили, мотоциклы, мотороллеры и товарные прицепы</li>
                <li
                  >• Гражданское оружие, основные части гражданского и
                  служебного огнестрельного оружия</li
                >
                <li>• Растения и животные</li>
                <li
                  >• Непериодические издания (книги, брошюры, альбомы,
                  картографические и нотные издания)</li
                >
              </ul>
            </div>

            <div>
              <h3 class="text-2xl font-semibold mb-4"
                >Возврат товара надлежащего качества</h3
              >
              <p class="text-lg text-muted-foreground mb-4">
                При возврате товара надлежащего качества в течение 14 дней:
              </p>
              <ul class="space-y-2 text-lg text-muted-foreground ml-6">
                <li>• Товар должен быть в товарном виде</li>
                <li>• Сохранены все пломбы, ярлыки, упаковка</li>
                <li>• Предоставлены документы, подтверждающие покупку</li>
                <li
                  >• Возврат осуществляется тем же способом, которым была
                  произведена оплата</li
                >
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6, delay: 0.4 }"
          class="mt-16"
        >
          <h2 class="text-3xl font-bold mb-8"
            >Возврат товара ненадлежащего качества</h2
          >

          <div class="space-y-8">
            <div>
              <h3 class="text-2xl font-semibold mb-4"
                >Обнаружение недостатков</h3
              >
              <p class="text-lg text-muted-foreground mb-4">
                При обнаружении недостатков в товаре вы вправе:
              </p>
              <ul class="space-y-2 text-lg text-muted-foreground ml-6">
                <li
                  >• Потребовать замены на товар этой же марки (модели,
                  артикула)</li
                >
                <li
                  >• Потребовать замены на такой же товар другой марки (модели,
                  артикула) с соответствующим перерасчетом покупной цены</li
                >
                <li>• Потребовать соразмерного уменьшения покупной цены</li>
                <li
                  >• Потребовать незамедлительного безвозмездного устранения
                  недостатков товара или возмещения расходов на их
                  исправление</li
                >
                <li
                  >• Отказаться от исполнения договора купли-продажи и
                  потребовать возврата уплаченной за товар суммы</li
                >
              </ul>
            </div>

            <div>
              <h3 class="text-2xl font-semibold mb-4"
                >Сроки предъявления требований</h3
              >
              <p class="text-lg text-muted-foreground">
                Требования о возврате уплаченной за товар денежной суммы
                подлежат удовлетворению в течение 10 дней со дня предъявления
                соответствующего требования.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6, delay: 0.6 }"
          class="mt-16"
        >
          <h2 class="text-3xl font-bold mb-8">Порядок возврата</h2>

          <div class="space-y-8">
            <div>
              <h3 class="text-2xl font-semibold mb-4"
                >Документы для возврата</h3
              >
              <p class="text-lg text-muted-foreground mb-4">
                Для оформления возврата необходимо предоставить:
              </p>
              <ul class="space-y-2 text-lg text-muted-foreground ml-6">
                <li>• Заявление на возврат товара</li>
                <li>• Документ, удостоверяющий личность</li>
                <li
                  >• Товарный чек или иной документ, подтверждающий оплату
                  товара</li
                >
                <li>• Товар в полной комплектации</li>
              </ul>
            </div>

            <div>
              <h3 class="text-2xl font-semibold mb-4">Способы возврата</h3>
              <p class="text-lg text-muted-foreground mb-4">
                Возврат товара может быть осуществлен:
              </p>
              <ul class="space-y-2 text-lg text-muted-foreground ml-6">
                <li
                  >• В нашем магазине по адресу: г. Москва, ул. Примерная, д.
                  123</li
                >
                <li
                  >• Через курьерскую службу (при доставке товара курьером)</li
                >
                <li
                  >• Почтой России (для товаров, приобретенных с доставкой)</li
                >
              </ul>
            </div>

            <div>
              <h3 class="text-2xl font-semibold mb-4"
                >Возврат денежных средств</h3
              >
              <p class="text-lg text-muted-foreground">
                Возврат денежных средств осуществляется тем же способом, которым
                была произведена оплата товара, в течение 10 дней с момента
                принятия решения о возврате.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6, delay: 0.8 }"
          class="mt-16"
        >
          <h2
            class="text-3xl font-bold mb-8"
            title="Важная информация"
            >Важная информация</h2
          >

          <UiAlert class="mb-6">
            <Info class="h-4 w-4" />
            <UiAlertTitle>Обратите внимание</UiAlertTitle>
            <UiAlertDescription>
              <ul class="space-y-2">
                <li
                  >• Возврат товара осуществляется только при наличии всех
                  документов</li
                >
                <li
                  >• Товар должен быть в товарном виде с сохранением
                  упаковки</li
                >
                <li
                  >• При возврате товара ненадлежащего качества экспертиза
                  проводится за счет продавца</li
                >
                <li
                  >• В случае спора о причинах возникновения недостатков товара
                  продавец обязан провести экспертизу товара за свой счет</li
                >
                <li
                  >• Потребитель вправе участвовать в проверке качества
                  товара</li
                >
              </ul>
            </UiAlertDescription>
          </UiAlert>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6, delay: 1.0 }"
          class="mt-16"
        >
          <h2 class="text-3xl font-bold mb-8">Контакты для вопросов</h2>
          <p class="text-lg text-muted-foreground mb-6">
            Если у вас возникли вопросы по возврату или обмену товара, свяжитесь
            с нами:
          </p>
          <div class="space-y-4">
            <div class="flex justify-between items-center py-3 border-b">
              <span class="font-medium">Телефон</span>
              <span class="text-muted-foreground">{{
                $config.public.phoneNumber
              }}</span>
            </div>
            <div class="flex justify-between items-center py-3 border-b">
              <span class="font-medium">Email</span>
              <span class="text-muted-foreground">{{
                $config.public.email
              }}</span>
            </div>
            <div class="flex justify-between items-center py-3">
              <span class="font-medium">Время работы</span>
              <span class="text-muted-foreground">{{
                $config.public.deliveryTime
              }}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
</template>

<style>
  .prose h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .prose h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .prose p {
    margin-bottom: 1rem;
    color: hsl(var(--muted-foreground));
  }

  .prose ul {
    margin-bottom: 1rem;
  }

  .prose ul li {
    margin-bottom: 0.5rem;
    color: hsl(var(--muted-foreground));
  }
</style>
