import { create } from "zustand";

interface CustomItem {
  image?: string;
  audio?: string;
  index?: number;
}

interface CustomItemsStore {
  customItems: CustomItem[];
  insertCustomItem: (item: CustomItem) => void;
  setCustomItems: (items: CustomItem[]) => void;
  removeCustomItem: (index: number) => void;
  updateCustomItem: (index: number, item: CustomItem) => void;
  resetCustomItems: () => void;
}

export const useCustomItems = create<CustomItemsStore>((set) => ({
  customItems: [],
  insertCustomItem: (item: CustomItem) =>
    set((state) => ({ customItems: [...state.customItems, item] })),
  setCustomItems: (items: CustomItem[]) => set({ customItems: items }),
  removeCustomItem: (index: number) =>
    set((state) => ({
      customItems: state.customItems.filter((_, i) => i !== index),
    })),
  updateCustomItem: (index: number, item: CustomItem) =>
    set((state) => ({
      customItems: state.customItems.map((i, i2) => (i2 === index ? item : i)),
    })),
  resetCustomItems: () => set({ customItems: [] }),
}));
