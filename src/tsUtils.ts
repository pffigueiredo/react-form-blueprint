import { JSXElementConstructor } from "react";

/* eslint-disable prettier/prettier */
export type Nullable<T> = T | null | undefined;

export type ValueOf<T> = T[keyof T];

export type ObjectType<T> = Record<keyof T, unknown>;

export type RecursiveKeyOf<TObj extends ObjectType<TObj>> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

// DotNotationToCamelCase<'hello.world'> => "helloWorld"
export type DotNotationToCamelCase<S extends string> = S extends `${infer T}.${infer U}`
  ? `${Lowercase<T>}${Capitalize<DotNotationToCamelCase<U>>}`
  : S;


// One of the objects
type OneOnly<Obj extends object, Key extends keyof Obj> = { [key in Exclude<keyof Obj, Key>]+?: undefined } & Pick<Obj, Key>;
type OneOfByKey<Obj extends object> = { [key in keyof Obj]: OneOnly<Obj, key> };
export type OneOfType<Obj extends object> = ValueOf<OneOfByKey<Obj>>;


// At least one of the keys is required
export type RequireAtLeastOne<T> = { [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>; }[keyof T]

 // ************************** REACT types  **************************
export type ReactComponent = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

// infers the prop types to be used in presetProps
export type InferPropsType<T> = T extends ReactComponent ? React.ComponentProps<T> : never;

export type ComponentWithProps<T extends ReactComponent> = {
    component: T;
    presetProps?: InferPropsType<T>;
};

