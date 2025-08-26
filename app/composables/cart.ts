interface CartItem {
  id: number;
  count: number;
}

export const useCart = () => {
  // items: [{ id, count }]
  const items = useLocalStorage<CartItem[]>('cart', []);

  // Добавить товар (или увеличить количество)
  const add = (id: number, count = 1) => {
    const idx = items.value.findIndex((item) => item.id === id);
    if (idx !== -1) {
      items.value[idx]!.count += count;
    } else {
      items.value.push({ id, count });
    }
  };

  // Установить точное количество
  const set = (id: number, count: number) => {
    const idx = items.value.findIndex((item) => item.id === id);
    if (idx !== -1) {
      if (count <= 0) {
        items.value.splice(idx, 1);
      } else {
        items.value[idx]!.count = count;
      }
    } else if (count > 0) {
      items.value.push({ id, count });
    }
  };

  // Удалить товар
  const remove = (id: number) => {
    items.value = items.value.filter((item) => item.id !== id);
  };

  // Очистить корзину
  const clear = () => {
    items.value = [];
  };

  // Проверить наличие товара
  const has = (id: number) => {
    return items.value.some((item) => item.id === id);
  };

  // Получить количество товара
  const getCount = (id: number) => {
    return items.value.find((item) => item.id === id)?.count || 0;
  };

  // Общее количество товаров
  const totalCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.count, 0)
  );

  return {
    items,
    add,
    set,
    remove,
    clear,
    has,
    getCount,
    totalCount,
  };
};
