<template>
  <section class="relative parallax-section">
    <div class="container mx-auto px-4 py-20 flex items-center justify-center">
      <div
        class="w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-xl shadow-2xl p-8"
      >
        <div class="mb-6 text-center">
          <h2 class="text-2xl font-semibold text-white"
            >Получите скидку на мебель</h2
          >
          <p class="mt-2 text-white/80 text-sm">
            Оставьте имя и телефон — отправим промокод на
            <span class="font-semibold">-10% на первую покупку</span> и поможем
            подобрать мебель под ваш интерьер.
          </p>
        </div>
        <form
          class="space-y-6"
          @submit="onSubmit"
        >
          <UiFormField
            v-slot="{ componentField }"
            name="name"
            :validate-on-blur="!isFieldDirty"
          >
            <UiFormItem>
              <UiFormLabel class="text-sm font-medium text-white/90"
                >Имя</UiFormLabel
              >
              <UiFormControl>
                <UiInput
                  type="text"
                  placeholder="Ваше имя"
                  v-bind="componentField"
                  class="text-white placeholder:text-white/70"
                />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <UiFormField
            v-slot="{ componentField }"
            name="phone"
            :validate-on-blur="!isFieldDirty"
          >
            <UiFormItem>
              <UiFormLabel class="text-sm font-medium text-white/90"
                >Телефон</UiFormLabel
              >
              <UiFormControl>
                <UiInput
                  type="tel"
                  inputmode="tel"
                  placeholder="+7 (___) ___-__-__"
                  v-bind="componentField"
                  class="text-white placeholder:text-white/70"
                />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <UiButton
            type="submit"
            class="w-full h-11 text-base font-semibold"
          >
            Отправить
          </UiButton>

          <p class="text-xs text-white/60 text-center">
            Отправляя форму, вы соглашаетесь с обработкой персональных данных.
            Мы не звоним без необходимости.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { z } from 'zod';
  import { toTypedSchema } from '@vee-validate/zod';
  import { useForm } from 'vee-validate';

  const schema = toTypedSchema(
    z.object({
      name: z.string({ message: 'Введите имя' }).min(2, 'Минимум 2 символа'),
      phone: z
        .string({ message: 'Введите номер телефона' })
        .regex(/^\+?\d[\d\s\-()]{9,}$/u, 'Некорректный номер'),
    })
  );

  const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: { name: '', phone: '' },
  });

  const onSubmit = handleSubmit((values) => {
    // Пока никуда не отправляем
    console.log('feedback form values', values);
  });
</script>

<style>
  .parallax-section {
    background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
      url('/form-bg.jpg');
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
