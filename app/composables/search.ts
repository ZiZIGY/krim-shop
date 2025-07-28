export const useSearch = (onSearch?: (query: string) => void) => {
  const inputRef = shallowRef<HTMLInputElement>();
  const searchQuery = ref('');
  const showDropdown = ref(false);
  const selectedIndex = ref(-1);

  const searchHistory = useLocalStorage<string[]>('search-history', [], {
    serializer: {
      read: (v) => (v ? JSON.parse(v) : []),
      write: (v) => JSON.stringify(v),
    },
  });

  const filteredHistory = computed(() => {
    if (!searchQuery.value) return searchHistory.value;
    return searchHistory.value.filter(
      (item) =>
        item.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
        item !== searchQuery.value
    );
  });

  const addToHistory = (query: string) => {
    if (!query || query.length < 2) return;

    const existing = searchHistory.value.indexOf(query);
    if (existing > -1) searchHistory.value.splice(existing, 1);

    searchHistory.value.unshift(query);
    if (searchHistory.value.length > 12) searchHistory.value.length = 12;
  };

  const performSearch = (query: string) => {
    if (query.trim()) {
      addToHistory(query.trim());
      onSearch?.(query.trim());
    }
    showDropdown.value = false;
    selectedIndex.value = -1;
    inputRef.value?.blur();
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const items = [searchQuery.value, ...filteredHistory.value].filter(Boolean);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedIndex.value = Math.min(selectedIndex.value + 1, items.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const selected = items[selectedIndex.value] || searchQuery.value;
      if (selected) performSearch(selected);
    } else if (event.key === 'Escape') {
      showDropdown.value = false;
      selectedIndex.value = -1;
      inputRef.value?.blur();
    }
  };

  const clearSearch = () => {
    searchQuery.value = '';
    showDropdown.value = false;
    selectedIndex.value = -1;
  };

  const clearHistory = () => {
    searchHistory.value.length = 0;
    showDropdown.value = false;
  };

  const removeFromHistory = (item: string) => {
    searchHistory.value.splice(searchHistory.value.indexOf(item), 1);
  };

  watch(searchQuery, () => {
    selectedIndex.value = -1;
    showDropdown.value = !!searchQuery.value || searchHistory.value.length > 0;
  });

  return {
    inputRef,
    searchQuery,
    showDropdown,
    selectedIndex,
    filteredHistory,
    performSearch,
    handleKeydown,
    clearSearch,
    clearHistory,
    removeFromHistory,
  };
};
