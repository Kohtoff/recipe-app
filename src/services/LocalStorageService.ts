export const LocalStorageService = {
  getItems<T>(key: string): T[] {
    if (window !== undefined) {
      return JSON.parse(localStorage.getItem(key) || "[]") as T[];
    }
    return [];
  },

  setItems<T>(key: string, items: T[]): void {
    if (window !== undefined) {
      localStorage.setItem(key, JSON.stringify(items));
    }
  },

  addItem<T>(key: string, item: T, compareFn: (a: T, b: T) => boolean): void {
    const items = this.getItems<T>(key);
    if (!items.some((existingItem) => compareFn(existingItem, item))) {
      items.push(item);
      this.setItems(key, items);
    }
  },

  removeItem<T>(
    key: string,
    item: T,
    compareFn: (a: T, b: T) => boolean
  ): void {
    const items = this.getItems<T>(key);
    const newItems = items.filter(
      (existingItem) => !compareFn(existingItem, item)
    );
    this.setItems(key, newItems);
  },

  getItemById<T>(
    key: string,
    id: string,
    idSelector: (item: T) => string
  ): T | undefined {
    const items = this.getItems<T>(key);
    return items.find((item) => idSelector(item) === id);
  },
};
