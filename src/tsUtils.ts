export type Nullable<T> = T | null | undefined;

export type valueOf<T> = T[keyof T];

export type ObjectType<T> = Record<keyof T, unknown>;

export type RecursiveKeyOf<TObj extends ObjectType<TObj>> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends Record<string, unknown>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];
