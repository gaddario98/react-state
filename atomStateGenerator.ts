import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { storage } from "./storage";

export type AtomGeneratorOptions<T> = {
  key: string;
  defaultValue: T;
  persist?: boolean;
};

export const atomStateGenerator = <T>({
  key,
  defaultValue,
  persist = false,
}: AtomGeneratorOptions<T>) => {
  const jotaiStorage = createJSONStorage<T>(() => storage); // Storage sincrono valido

  const jotaiAtom = atomWithStorage<T>(key, defaultValue, jotaiStorage);

  const useValue = () => {
    const [value] = useAtom(jotaiAtom);
    return value;
  };

  const useState = () => useAtom(jotaiAtom);

  const useReset = () => {
    const [, setValue] = useAtom(jotaiAtom);
    return () => {
      setValue(defaultValue);
      if (persist) {
        storage.removeItem(key);
      }
    };
  };

  return {
    atom: jotaiAtom,
    useValue,
    useState,
    useReset,
  };
};
