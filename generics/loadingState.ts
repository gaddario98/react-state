import { atomStateGenerator } from "../atomStateGenerator";

const {
  atom: loadingAtom,
  useValue: useLoadingValue,
  useState: useLoadingState,
} = atomStateGenerator<boolean>({
  defaultValue: false,
  key: "react-loading-state",
  persist: false,
});

const useSetLoading = () => {
  const [, setValue] = useLoadingState();
  return (val: boolean) => {setValue(val)};
};
export { loadingAtom, useLoadingValue, useLoadingState, useSetLoading };
