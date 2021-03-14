/* eslint-disable @typescript-eslint/ban-types */
export type Nullable<T> = T | null | undefined;

export type ValueOf<T> = T[keyof T];

export type ObjectType<T> = Record<keyof T, unknown>;

export type RecursiveKeyOf<TObj extends ObjectType<TObj>> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends Record<string, unknown>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

// DotNotationToCamelCase<'hello.world'> => "helloWorld"
export type DotNotationToCamelCase<S extends string> = S extends `${infer T}.${infer U}`
  ? `${Lowercase<T>}${Capitalize<DotNotationToCamelCase<U>>}`
  : S;

export type AsString<S extends string> = S extends string ? S : S;
