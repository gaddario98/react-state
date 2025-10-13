import { compress, decompress } from 'lz-string';
import { c } from 'react/compiler-runtime';
import { createJSONStorage, atomWithStorage } from 'jotai/utils';
import { useAtom } from 'jotai';

let storage = {
  getItem: async key => {
    try {
      if (typeof localStorage === "undefined") return null;
      const compressed = localStorage.getItem(key);
      if (!compressed) return null;
      const json = decompress(compressed);
      return json !== null && json !== void 0 ? json : null;
    } catch (error) {
      console.error("Error getting item:", error);
      return null;
    }
  },
  setItem: async (key, value) => {
    try {
      if (typeof localStorage === "undefined") return;
      const compressed = compress(value);
      localStorage.setItem(key, compressed);
    } catch (error) {
      console.error("Error setting item:", error);
    }
  },
  removeItem: async key => {
    try {
      if (typeof localStorage === "undefined") return;
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }
};
const setCustomStorage = newStorage => {
  storage = newStorage;
};

const atomStateGenerator = ({
  key,
  defaultValue,
  persist = false
}) => {
  const jotaiStorage = createJSONStorage(() => storage); // Storage sincrono valido
  const jotaiAtom = atomWithStorage(key, defaultValue, jotaiStorage);
  const useValue = () => {
    const [value] = useAtom(jotaiAtom);
    return value;
  };
  const useState = () => {
    return useAtom(jotaiAtom);
  };
  const useReset = () => {
    const $ = c(2);
    const [, setValue] = useAtom(jotaiAtom);
    let t0;
    if ($[0] !== setValue) {
      t0 = () => {
        setValue(defaultValue);
        if (persist) {
          storage.removeItem(key);
        }
      };
      $[0] = setValue;
      $[1] = t0;
    } else {
      t0 = $[1];
    }
    return t0;
  };
  return {
    atom: jotaiAtom,
    useValue,
    useState,
    useReset
  };
};

const {
  atom: loadingAtom,
  useValue: useLoadingValue,
  useState: useLoadingState
} = atomStateGenerator({
  defaultValue: false,
  key: "react-loading-state",
  persist: false
});
const useSetLoading = () => {
  const $ = c(2);
  const [, setValue] = useLoadingState();
  let t0;
  if ($[0] !== setValue) {
    t0 = val => {
      setValue(val);
    };
    $[0] = setValue;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};

export { atomStateGenerator, loadingAtom, setCustomStorage, storage, useLoadingState, useLoadingValue, useSetLoading };
//# sourceMappingURL=index.mjs.map
