"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set({ items: [...get().items, item] }),
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // ⬅ VERY IMPORTANT!
    }
  )
);
