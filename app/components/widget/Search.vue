<script setup lang="ts">
  const {
    searchQuery,
    showDropdown,
    selectedIndex,
    filteredHistory,
    handleKeydown,
    clearSearch,
    clearHistory,
    removeFromHistory,
    handleSubmit,
  } = useSearch();
</script>

<template>
  <form
    class="relative w-full"
    @submit.prevent="handleSubmit"
  >
    <div class="flex gap-2">
      <div class="relative flex-1">
        <Icon
          name="mdi:magnify"
          class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        />

        <UiInput
          v-model="searchQuery"
          placeholder="Поиск мебели..."
          class="w-full pl-10 pr-10 h-full"
          @focus="showDropdown = true"
          @blur="showDropdown = false"
          @keydown="handleKeydown"
        />

        <UiButton
          v-if="searchQuery"
          variant="ghost"
          size="icon"
          type="button"
          class="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          @mousedown.prevent
          @click="clearSearch"
        >
          <Icon
            name="mdi:close"
            class="h-4 w-4"
          />
        </UiButton>
      </div>

      <UiButton
        type="submit"
        size="sm"
        class="h-10 px-4"
        :disabled="!searchQuery.trim()"
      >
        Найти
      </UiButton>
    </div>

    <ClientOnly>
      <div
        v-if="showDropdown && (filteredHistory.length > 0 || searchQuery)"
        class="absolute top-full left-0 right-0 z-50 mt-2 max-h-[300px] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
      >
        <div class="p-1">
          <div
            v-if="searchQuery"
            class="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            :class="{ 'bg-accent': selectedIndex === 0 }"
            @mousedown.prevent
            @click="
              searchQuery = searchQuery;
              showDropdown = false;
            "
          >
            <Icon
              name="mdi:magnify"
              class="h-4 w-4 text-muted-foreground"
            />
            <span>
              Искать: <strong>{{ searchQuery }}</strong>
            </span>
          </div>

          <div
            v-for="(item, index) in filteredHistory"
            :key="item"
            class="group flex cursor-pointer items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            :class="{
              'bg-accent': selectedIndex === (searchQuery ? index + 1 : index),
            }"
            @mousedown.prevent
            @click="
              searchQuery = item;
              showDropdown = false;
            "
          >
            <div class="flex items-center gap-2">
              <Icon
                name="mdi:history"
                class="h-4 w-4 text-muted-foreground"
              />
              <span>{{ item }}</span>
            </div>

            <UiButton
              variant="ghost"
              size="icon"
              type="button"
              class="h-6 w-6 opacity-0 group-hover:opacity-100"
              @click.stop="removeFromHistory(item)"
            >
              <Icon
                name="mdi:close"
                class="h-3 w-3"
              />
            </UiButton>
          </div>

          <UiButton
            v-if="filteredHistory.length > 0 && !searchQuery"
            variant="ghost"
            size="sm"
            type="button"
            class="w-full justify-start gap-2 text-muted-foreground"
            @mousedown.prevent
            @click="clearHistory"
          >
            <Icon
              name="mdi:delete-sweep"
              class="h-4 w-4"
            />
            Очистить историю
          </UiButton>
        </div>
      </div>
    </ClientOnly>
  </form>
</template>

<style scoped>
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
</style>
