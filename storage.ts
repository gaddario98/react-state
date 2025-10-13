import { compress, decompress } from "lz-string";

export let storage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (typeof localStorage === "undefined") return null;
      const compressed = localStorage.getItem(key);
      if (!compressed) return null;

      const json = decompress(compressed);
      return json ?? null;
    } catch (error) {
      console.error("Error getting item:", error);
      return null;
    }
  },

  setItem: async(key: string, value: string) => {
    try {
      if (typeof localStorage === "undefined") return;
      const compressed = compress(value);
      localStorage.setItem(key, compressed);
    } catch (error) {
      console.error("Error setting item:", error);
    }
  },

  removeItem: async(key: string) => {
    try {
      if (typeof localStorage === "undefined") return;
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  },
};

export const setCustomStorage = (newStorage: typeof storage) => {
  storage = newStorage;
};
