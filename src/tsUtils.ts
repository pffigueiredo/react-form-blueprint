export type Nullable<T> = T | null | undefined;

export type valueOf<T> = T[keyof T];

// type Join<K, P> = K extends string | number
//   ? P extends string | number
//     ? `${K}${'' extends P ? '' : '.'}${P}`
//     : never
//   : never;

// type Prev = [never, 0, 1, 2];

// export type Path<T> = T extends Record<keyof TObj | symbol, unknown> ? keyof valueOf<T> : keyof T;

type ObjectType<T> = Record<keyof T, unknown>;

export type RecursiveKeyOf<TObj extends ObjectType<TObj>> = {
  // 1. Create an object type from `TObj`, where all the individual
  // properties are mapped to a string type if the value is not an object
  // or union of string types containing the current and descendant
  // possibilities when it's an object type.
  // Does this for every property in `TObj` that is a string or number
  [TPropName in keyof TObj & (string | number)]: HandleProperty<TObj[TPropName], TPropName>;
}[keyof TObj & (string | number)];

type HandleProperty<TValue, TPropName extends string | number> =
  // If the value of the property is an object type...
  TValue extends ObjectType<TValue>
    ? // Then...
      // 1. Return the current property name as a string
      | `${TPropName}`
        // 2. And return the property name concatenated with a `.` and
        //    all the return values of `RecrusiveKeyOf<TValue>`
        | `${TPropName}.${RecursiveKeyOf<TValue>}`
    : // Else, only return the current property name as a string
      `${TPropName}`;
