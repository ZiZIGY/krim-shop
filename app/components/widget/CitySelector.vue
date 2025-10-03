<script setup lang="ts">
  const { cities, selectedCity, handleCitySelect } = useRegion();
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton
        variant="ghost"
        class="gap-2 text-sm"
      >
        <Icon
          name="mdi:map-marker"
          class="h-4 w-4 text-primary"
        />
        <ClientOnly>
          <template #fallback>
            <UiSkeleton class="h-4 w-24" />
          </template>

          <span>
            {{
              cities?.find((city) => city.id === selectedCity)?.name ||
              'Выберите город'
            }}
          </span>
        </ClientOnly>
        <Icon
          name="mdi:chevron-down"
          class="h-4 w-4"
        />
      </UiButton>
    </UiDropdownMenuTrigger>

    <UiDropdownMenuContent class="w-48">
      <UiDropdownMenuItem
        v-for="city in cities"
        :key="city.id"
        :class="{ 'bg-accent': selectedCity === city.id }"
        @click="handleCitySelect(city.id)"
      >
        <div class="flex w-full items-center justify-between">
          <span>{{ city.name }}</span>
          <!-- <span
            v-if="city.base_cost_effective > 0"
            class="text-xs text-muted-foreground"
          >
            +{{ city.base_cost_effective }}₽
          </span> -->
        </div>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
