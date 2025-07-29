<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton
        variant="ghost"
        class="gap-2 hover:bg-accent/50 transition-colors group"
      >
        <Icon
          name="mdi:menu"
          class="h-5 w-5"
        />
        <span class="font-medium">Каталог</span>
        <Icon
          name="mdi:chevron-down"
          class="h-4 w-4 transition-transform group-hover:rotate-180"
        />
      </UiButton>
    </UiDropdownMenuTrigger>

    <UiDropdownMenuContent
      class="w-80"
      align="start"
    >
      <div class="grid grid-cols-2 gap-1 p-2">
        <!-- Мебель для гостиной -->
        <UiDropdownMenuItem as-child>
          <NuxtLink
            to="/catalog/gostinaya"
            class="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
          >
            <div
              class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
            >
              <Icon
                name="mdi:sofa"
                class="h-6 w-6 text-primary"
              />
            </div>
            <div class="flex-1">
              <div class="font-medium">Гостиная</div>
              <div class="text-xs text-muted-foreground"
                >Диваны, кресла, столы</div
              >
            </div>
          </NuxtLink>
        </UiDropdownMenuItem>

        <!-- Мебель для спальни -->
        <UiDropdownMenuItem as-child>
          <NuxtLink
            to="/catalog/spalnya"
            class="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
          >
            <div
              class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
            >
              <Icon
                name="mdi:bed"
                class="h-6 w-6 text-primary"
              />
            </div>
            <div class="flex-1">
              <div class="font-medium">Спальня</div>
              <div class="text-xs text-muted-foreground"
                >Кровати, шкафы, тумбы</div
              >
            </div>
          </NuxtLink>
        </UiDropdownMenuItem>

        <!-- Мебель для кухни -->
        <UiDropdownMenuItem as-child>
          <NuxtLink
            to="/catalog/kuhnya"
            class="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
          >
            <div
              class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
            >
              <Icon
                name="mdi:silverware-fork-knife"
                class="h-6 w-6 text-primary"
              />
            </div>
            <div class="flex-1">
              <div class="font-medium">Кухня</div>
              <div class="text-xs text-muted-foreground"
                >Кухонные гарнитуры, столы</div
              >
            </div>
          </NuxtLink>
        </UiDropdownMenuItem>

        <!-- Мебель для ванной -->
        <UiDropdownMenuItem as-child>
          <NuxtLink
            to="/catalog/vannaya"
            class="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
          >
            <div
              class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
            >
              <Icon
                name="mdi:shower"
                class="h-6 w-6 text-primary"
              />
            </div>
            <div class="flex-1">
              <div class="font-medium">Ванная</div>
              <div class="text-xs text-muted-foreground"
                >Шкафчики, полки, зеркала</div
              >
            </div>
          </NuxtLink>
        </UiDropdownMenuItem>

        <!-- Мебель для детской -->
        <UiDropdownMenuItem as-child>
          <NuxtLink
            to="/catalog/detskaya"
            class="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
          >
            <div
              class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
            >
              <Icon
                name="mdi:baby-face"
                class="h-6 w-6 text-primary"
              />
            </div>
            <div class="flex-1">
              <div class="font-medium">Детская</div>
              <div class="text-xs text-muted-foreground"
                >Кровати, столы, шкафы</div
              >
            </div>
          </NuxtLink>
        </UiDropdownMenuItem>

        <!-- Мебель для офиса -->
        <UiDropdownMenuItem as-child>
          <NuxtLink
            to="/catalog/ofis"
            class="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
          >
            <div
              class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
            >
              <Icon
                name="mdi:desk"
                class="h-6 w-6 text-primary"
              />
            </div>
            <div class="flex-1">
              <div class="font-medium">Офис</div>
              <div class="text-xs text-muted-foreground"
                >Столы, стулья, шкафы</div
              >
            </div>
          </NuxtLink>
        </UiDropdownMenuItem>

        <!-- Освещение -->
        <UiDropdownMenuItem as-child>
          <NuxtLink
            to="/catalog/osveshchenie"
            class="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
          >
            <div
              class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
            >
              <Icon
                name="mdi:lightbulb"
                class="h-6 w-6 text-primary"
              />
            </div>
            <div class="flex-1">
              <div class="font-medium">Освещение</div>
              <div class="text-xs text-muted-foreground"
                >Люстры, светильники, лампы</div
              >
            </div>
          </NuxtLink>
        </UiDropdownMenuItem>

        <!-- Декор -->
        <UiDropdownMenuItem as-child>
          <NuxtLink
            to="/catalog/dekor"
            class="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
          >
            <div
              class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
            >
              <Icon
                name="mdi:flower"
                class="h-6 w-6 text-primary"
              />
            </div>
            <div class="flex-1">
              <div class="font-medium">Декор</div>
              <div class="text-xs text-muted-foreground"
                >Подушки, картины, вазы</div
              >
            </div>
          </NuxtLink>
        </UiDropdownMenuItem>
      </div>

      <!-- Разделитель -->
      <UiDropdownMenuSeparator />

      <!-- Ссылка на весь каталог -->
      <UiDropdownMenuItem as-child>
        <NuxtLink
          to="/catalog"
          class="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
        >
          <Icon
            name="mdi:view-grid"
            class="h-5 w-5 text-primary"
          />
          <span class="font-medium">Весь каталог</span>
        </NuxtLink>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

<script setup lang="ts">
  // Компонент выпадающего меню каталога
</script>

<style scoped></style>
