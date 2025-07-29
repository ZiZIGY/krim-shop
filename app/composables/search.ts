export const useSearch = () => {
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
    }

    showDropdown.value = false;
    selectedIndex.value = -1;
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const items = [searchQuery.value, ...filteredHistory.value].filter(Boolean);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedIndex.value = Math.min(selectedIndex.value + 1, items.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1);
    } else if (event.key === 'Escape') {
      showDropdown.value = false;
      selectedIndex.value = -1;
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

  const handleSubmit = () => {
    console.log('handleSubmit', searchQuery.value);
    if (searchQuery.value.trim()) {
      performSearch(searchQuery.value.trim());
      navigateTo(`/search?q=${searchQuery.value.trim()}`);
    }
  };

  watch(searchQuery, () => {
    selectedIndex.value = -1;
    showDropdown.value = !!searchQuery.value || searchHistory.value.length > 0;
  });

  return {
    searchQuery,
    showDropdown,
    selectedIndex,
    filteredHistory,
    performSearch,
    handleKeydown,
    clearSearch,
    clearHistory,
    removeFromHistory,
    handleSubmit,
  };
};
