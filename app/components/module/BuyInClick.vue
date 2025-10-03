<script setup lang="ts">
  import { z } from 'zod';
  import { toTypedSchema } from '@vee-validate/zod';
  import { useForm } from 'vee-validate';

  defineProps<{
    disabled?: boolean;
  }>();

  const config = useRuntimeConfig();

  const schema = toTypedSchema(
    z.object({
      name: z.string({ message: 'Введите имя' }).min(2, 'Минимум 2 символа'),
      phone: z
        .string({ message: 'Введите номер телефона' })
        .regex(/^\+?\d[\d\s\-()]{9,}$/u, 'Некорректный номер'),
      comment: z.string().optional(),
      product_url: z.string().optional(),
    })
  );

  const { handleSubmit, values, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
      name: '',
      phone: '',
      comment: '',
      product_url: window.location.href,
    },
  });

  const {
    execute,
    data: response,
    pending,
    error,
  } = useFetch('/api/one-click/', {
    baseURL: config.public.apiUrl,
    method: 'post',
    immediate: false,
    body: values,
    watch: false,
  });

  const onSubmit = handleSubmit(async () => {
    await execute();

    if (response.value) resetForm();
  });
</script>

<template>
  <UiDialog>
    <UiDialogTrigger as-child>
      <UiButton
        variant="outline"
        size="lg"
        class="w-full"
        :disabled="disabled"
      >
        <Icon
          name="mdi:flash"
          class="h-5 w-5 mr-2"
        />
        Купить в 1 клик
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="sm:max-w-[425px]">
      <UiDialogHeader>
        <UiDialogTitle>Купить в 1 клик</UiDialogTitle>
        <UiDialogDescription>
          Заполните форму и мы свяжемся с вами для оформления заказа
        </UiDialogDescription>
      </UiDialogHeader>

      <form
        class="space-y-4 py-4"
        @submit="onSubmit"
      >
        <!-- Поле имени -->
        <UiFormField
          v-slot="{ componentField }"
          name="name"
        >
          <UiFormItem>
            <UiFormLabel>Имя</UiFormLabel>
            <UiFormControl>
              <UiInput
                type="text"
                placeholder="Ваше имя"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <!-- Поле телефона -->
        <UiFormField
          v-slot="{ componentField }"
          name="phone"
        >
          <UiFormItem>
            <UiFormLabel>Телефон</UiFormLabel>
            <UiFormControl>
              <UiInput
                type="tel"
                placeholder="+7 (___) ___-__-__"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <!-- Поле комментария -->
        <UiFormField
          v-slot="{ componentField }"
          name="comment"
        >
          <UiFormItem>
            <UiFormLabel>Комментарий (необязательно)</UiFormLabel>
            <UiFormControl>
              <UiTextarea
                placeholder="Ваши пожелания или комментарии"
                v-bind="componentField"
                class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiDialogFooter>
          <UiButton
            type="submit"
            :disabled="pending"
            class="w-full"
          >
            <span v-if="pending">Отправка...</span>
            <span v-else>Отправить заявку</span>
          </UiButton>
        </UiDialogFooter>

        <!-- Сообщения об ошибке и успехе -->
        <p
          v-if="error"
          class="text-xs text-red-400 text-center"
        >
          {{ error }}
        </p>

        <p
          v-if="response"
          class="text-xs text-green-400 text-center"
        >
          Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
        </p>

        <p class="text-xs text-muted-foreground text-center">
          Отправляя форму, вы соглашаетесь с обработкой персональных данных.
        </p>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
