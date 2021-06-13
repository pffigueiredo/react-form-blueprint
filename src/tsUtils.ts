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


 //********* REACT types 
export type ReactComponent = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

// infers the prop types to be used in presetProps
type InferPropsType<T> = T extends ReactComponent ? React.ComponentProps<T> : never;

export type ComponentWithProps<T extends ReactComponent> = {
    component: T;
    presetProps?: InferPropsType<T>;
};

