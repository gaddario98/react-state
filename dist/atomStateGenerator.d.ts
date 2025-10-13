export type AtomGeneratorOptions<T> = {
    key: string;
    defaultValue: T;
    persist?: boolean;
};
export declare const atomStateGenerator: <T>({ key, defaultValue, persist, }: AtomGeneratorOptions<T>) => {
    atom: import("jotai").WritableAtom<T | Promise<T>, [T | typeof import("jotai/utils").RESET | Promise<T> | ((prev: T | Promise<T>) => T | typeof import("jotai/utils").RESET | Promise<T>)], Promise<void>>;
    useValue: () => Awaited<T> | Awaited<T>;
    useState: () => [Awaited<T> | Awaited<T>, (args_0: T | typeof import("jotai/utils").RESET | Promise<T> | ((prev: T | Promise<T>) => T | typeof import("jotai/utils").RESET | Promise<T>)) => Promise<void>];
    useReset: () => () => void;
};
