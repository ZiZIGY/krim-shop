<script setup lang="ts">
  type FormRangeMin = {
    [K in keyof CatalogFilters['ranges'] as K extends string
      ? `${K}_min`
      : never]?: number;
  };

  type FormRangeMax = {
    [K in keyof CatalogFilters['ranges'] as K extends string
      ? `${K}_max`
      : never]?: number;
  };

  type FormAttributes = {
    [K in keyof CatalogFilters['attributes'] as K extends string
      ? `attr_${K}`
      : never]?: number[] | number;
  };

  type FormColors = {
    color?: number[];
  };

  type FilterForm = FormRangeMin & FormRangeMax & FormAttributes & FormColors;

  const config = useRuntimeConfig();
  const route = useRoute();

  function transformFilter<T extends Record<string, unknown>, R>(
    filters: T,
    cast: (val: unknown) => R
  ): Record<string, R | R[]> {
    const query: Record<string, R | R[]> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (Array.isArray(value)) {
        console.log(value);
        if (value.length > 0) query[key] = value.map(cast);
      } else {
        query[key] = cast(value);
      }
    });
    return query;
  }

  const { data: initialFilters } = await useFetch<CatalogFilters>(
    '/api/filters/',
    {
      baseURL: config.public.apiUrl,
      query: {
        category: route.params.slag,
      },
    }
  );

  const filters = ref<FilterForm>({});

  const handleFilterSubmit = () => {
    navigateTo({ query: transformFilter(filters.value, String) });
  };

  const handleFilterReset = () => {
    filters.value = {};
    navigateTo({ query: transformFilter(filters.value, String) });
  };
</script>

<template>
  <div class="filter-container">
    <!-- Заголовок и кнопка сброса -->
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium">Фильтры</h3>
      <UiButton
        variant="ghost"
        size="sm"
        @click="handleFilterReset"
      >
        <Icon
          name="mdi:close"
          class="h-4 w-4 mr-1"
        />
        Сбросить
      </UiButton>
    </div>

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
            :model-value="[
              filters[`${key}_min`] || range.min,
              filters[`${key}_max`] || range.max,
            ]"
            @update:model-value="
              (event) => {
                const [min, max] = event as [number, number];

                filters[`${key}_min`] = min;
                filters[`${key}_max`] = max;
              }
            "
          />
          <div class="flex gap-8">
            <UiNumberField
              v-model="filters[`${key}_min`]"
              :min="range.min"
              :max="range.max"
              invert-wheel-change
            >
              <UiNumberFieldContent>
                <UiNumberFieldDecrement />
                <UiNumberFieldInput />
                <UiNumberFieldIncrement />
              </UiNumberFieldContent>
            </UiNumberField>

            <UiNumberField
              v-model="filters[`${key}_max`]"
              :min="range.min"
              :max="range.max"
              invert-wheel-change
            >
              <UiNumberFieldContent>
                <UiNumberFieldDecrement />
                <UiNumberFieldInput />
                <UiNumberFieldIncrement />
              </UiNumberFieldContent>
            </UiNumberField>
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

          <!-- Chips -->
          <div
            v-if="attribute.filter_widget === 'chips'"
            class="flex flex-col gap-2"
          >
            <div
              v-for="option in attribute.options"
              :key="option.id"
              class="flex items-center space-x-2"
            >
              <UiSwitch
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

          <!-- Select -->

          <div v-if="attribute.filter_widget === 'select'">
            <UiSelect
              v-model="filters[`attr_${key}`]"
              :multiple="attribute.is_multiselect"
            >
              <UiSelectTrigger class="w-full">
                <UiSelectValue placeholder="Выберите значение" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem
                  v-for="option in attribute.options"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.title }}
                </UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
        </UiAccordionContent>
      </UiAccordionItem>

      <UiAccordionItem
        v-if="initialFilters?.colors"
        value="colors"
      >
        <UiAccordionTrigger>Цвета</UiAccordionTrigger>
        <UiAccordionContent>
          <!-- Checkbox -->

          <div class="flex flex-col gap-2">
            <div
              v-for="option in initialFilters?.colors"
              :key="option.id"
              class="flex items-center space-x-2"
            >
              <UiCheckbox
                :id="`option-${option.id}`"
                :model-value="(filters['color'] as number[])?.includes(option.id)"
                @update:model-value="
                  (toggled) => {
                    let arr = (filters[`color`]
                      ? filters[`color`]
                      : []) as number[];
                      
                    if (toggled) {
                      if (!arr.includes(option.id)) arr.push(option.id);
                    } else arr = arr.filter((id) => id !== option.id);
                    
                    filters[`color`] = arr;
                  }
                "
              />
              <UiLabel
                :for="`option-${option.id}`"
                class="size-5 rounded shadow"
                :style="{ backgroundColor: option.hex_code }"
              />
              <UiLabel :for="`option-${option.id}`">{{ option.name }}</UiLabel>
            </div>
          </div>
        </UiAccordionContent>
      </UiAccordionItem>
    </UiAccordion>

    <!-- Кнопка применения фильтров -->
    <div class="mt-6">
      <UiButton
        class="w-full"
        @click="handleFilterSubmit"
      >
        Применить фильтры
      </UiButton>
    </div>
  </div>
</template>
