<script setup lang="ts">
  const showMobileMenu = shallowRef(false);
  const { menuSections } = useMenu();

  const config = useRuntimeConfig();

  const { data } = await useFetch<ApiCategoriesResponse>('/api/categories/', {
    baseURL: config.public.apiUrl,
  });
</script>

<template>
  <!-- Бургер кнопка -->
  <UiButton
    variant="ghost"
    size="icon"
    class="lg:hidden"
    @click="showMobileMenu = true"
  >
    <Icon
      name="mdi:menu"
      class="h-5 w-5"
    />
  </UiButton>

  <!-- Мобильное меню в drawer -->
  <UiDrawer
    v-model:open="showMobileMenu"
    direction="left"
    class="h-svh"
  >
    <UiDrawerContent class="w-80 h-full">
      <UiDrawerHeader>
        <UiDrawerTitle>Меню</UiDrawerTitle>
      </UiDrawerHeader>

      <UiScrollArea class="h-[90%]">
        <div class="p-4">
          <!-- Навигация -->
          <WidgetSearch />
          <UiSeparator class="my-4" />
          <nav class="space-y-6">
            <div
              v-for="section in menuSections"
              :key="section.title"
            >
              <h3 class="text-sm font-medium text-muted-foreground mb-3">
                {{ section.title }}
              </h3>
              <div class="space-y-1">
                <template
                  v-for="item in section.items"
                  :key="item.href"
                >
                  <NuxtLink
                    v-if="
                      !item.href.startsWith('tel:') &&
                      !item.href.startsWith('mailto:')
                    "
                    :to="item.href"
                    class="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    active-class="bg-primary text-primary-foreground"
                  >
                    <Icon
                      :name="item.icon"
                      class="h-4 w-4"
                    />
                    {{ item.title }}
                  </NuxtLink>
                  <a
                    v-else
                    :href="item.href"
                    class="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Icon
                      :name="item.icon"
                      class="h-4 w-4"
                    />
                    {{
                      item.title === 'Телефон'
                        ? $config.public.phoneNumber
                        : $config.public.email
                    }}
                  </a>
                </template>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-medium text-muted-foreground mb-3">
                Каталог
              </h3>
              <div class="space-y-1">
                <template
                  v-for="item in data?.results"
                  :key="item.id"
                >
                  <NuxtLink
                    :to="`/catalog/${item.slug}`"
                    class="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    active-class="bg-primary text-primary-foreground"
                  >
                    <Icon
                      name="mdi:sofa"
                      class="h-4 w-4"
                    />
                    {{ item.name }}
                  </NuxtLink>
                </template>
              </div>
            </div>
          </nav>
        </div>
      </UiScrollArea>
    </UiDrawerContent>
  </UiDrawer>
</template>

<style></style>
