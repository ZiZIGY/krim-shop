<script setup lang="ts">
  const { initialFilters, filters } = useCatalog();
</script>

<template>
  <div class="filter-container">
    <!-- Заголовок и кнопка сброса -->
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium">Фильтры</h3>
      <UiButton
        variant="ghost"
        size="sm"
      >
        <Icon
          name="mdi:close"
          class="h-4 w-4 mr-1"
        />
        Сбросить
      </UiButton>
    </div>
    <!-- Аккордеон с фильтрами -->

    <pre>{{ filters }}</pre>

    <UiAccordion
      type="multiple"
      collapsible
    >
      <UiAccordionItem
        v-for="(range, key) in initialFilters?.ranges"
        :key="range.title"
        :value="range.title"
      >
        <UiAccordionTrigger>{{ range.title }}</UiAccordionTrigger>
        <UiAccordionContent class="my-2">
          <UiSlider
            class="mb-4"
            :min="range.min"
            :max="range.max"
            :default-value="[range.min, range.max]"
            @update:model-value="
              (event) => {
                const [min, max] = event as [number, number];

                filters[`${key}_min`] = min;
                filters[`${key}_max`] = max;
              }
            "
          />
          <div class="flex gap-8">
            <UiInput v-model="filters[`${key}_min`]" />
            <UiInput v-model="filters[`${key}_max`]" />
          </div>
        </UiAccordionContent>
      </UiAccordionItem>

      <UiAccordionItem
        v-for="(attribute, key) in initialFilters?.attributes"
        :key="key"
        :value="attribute.name"
      >
        <UiAccordionTrigger>{{ attribute.name }}</UiAccordionTrigger>
        <UiAccordionContent>
          <!-- Checkbox -->
          <div
            v-if="attribute.filter_widget === 'checkbox'"
            class="flex flex-col gap-2"
          >
            <div
              v-for="option in attribute.options"
              :key="option.id"
              class="flex items-center space-x-2"
            >
              <UiCheckbox
                :id="`option-${option.id}`"
                :model-value="(filters[`attr_${key}`] as number[])?.includes(option.id)"
                @update:model-value="
                  (toggled) => {
                    let arr = (filters[`attr_${key}`]
                      ? filters[`attr_${key}`]
                      : []) as number[];
                      
                    if (toggled) {
                      if (!arr.includes(option.id)) arr.push(option.id);
                    } else arr = arr.filter((id) => id !== option.id);
                    
                    filters[`attr_${key}`] = arr;
                  }
                "
              />
              <UiLabel :for="`option-${option.id}`">{{ option.title }}</UiLabel>
            </div>
          </div>
          <!-- Radio -->
          <UiRadioGroup
            v-if="attribute.filter_widget === 'radio'"
            v-model="filters[`attr_${key}`]"
          >
            <div
              v-for="option in attribute.options"
              :key="option.id"
              class="flex items-center space-x-2"
            >
              <UiRadioGroupItem
                :id="`option-${option.id}`"
                :value="option.id"
              />
              <UiLabel :for="`option-${option.id}`">{{ option.title }}</UiLabel>
            </div>
          </UiRadioGroup>
        </UiAccordionContent>
      </UiAccordionItem>
    </UiAccordion>

    <!-- Кнопка применения фильтров -->
    <div class="mt-6">
      <UiButton class="w-full"> Применить фильтры </UiButton>
    </div>
  </div>
</template>
