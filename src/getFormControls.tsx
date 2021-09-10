/* eslint-disable import/no-unresolved */
import camelCase from 'camelcase';
import { customFormControlsBuilder } from './factories/factory';
import { LabelControl, ReactLabelProps } from './label';
import {
  FormControlArg,
  InputControl,
  InputType,
  ReactInputProps,
} from './input';
import {
  DotNotationToCamelCase,
  InferPropsType,
  KeysUnder,
  OneOfType,
  RecursiveKeyOf,
  RequireAtLeastOne,
} from './tsUtils';
import { extractControlTypeValue } from './type-guards/guards';
import { ControlOptions } from './controlOptionsInstance';

export type ControlType = OneOfType<Record<InputType, true>>;
export interface FormControl {
  controlType: InputType;
  name: string;
}

// get the inner keys under the getFormControls arg ('number' | 'text'...)
type KeysOfInputType<T, K extends PropertyKey> = KeysUnder<
  T,
  K
> extends InputType
  ? KeysUnder<T, K>
  : never;

type FormControlsReturnVal<
  InputPropsT = ReactInputProps,
  LabelPropsT = ReactLabelProps
> = {
  input: (props: InputPropsT) => JSX.Element;
  label: (props: LabelPropsT) => JSX.Element;
};

export type GetFormControlsReturn<
  T,
  KeysToReturn extends string | null,
  FormOptionsSchema,
  ControlArgsSchema extends Record<string, unknown>
> = Record<
  DotNotationToCamelCase<
    KeysToReturn extends string ? KeysToReturn : RecursiveKeyOf<T>
  >,
  FormControlsReturnVal<
    FormOptionsSchema extends {
      customFormControls?: RequireAtLeastOne<Record<InputType, any>>;
    }
      ? FormOptionsSchema extends { customFormControls?: infer R } // if 'text' | 'number' are within customFormControls
        ? {
            [K in keyof R]: KeysUnder<
              ControlArgsSchema,
              keyof ControlArgsSchema
            > extends K
              ? R[K]
              : never;
          }[keyof R] extends infer A
          ? A extends { input: infer TComponent }
            ? InferPropsType<TComponent>
            : { cona: string }
          : { name: string }
        : ReactInputProps
      : ReactInputProps
  >

  // FormControlsReturnVal<
  //   FormOptionsSchema extends {
  //     customFormControls?: RequireAtLeastOne<Record<InputType, any>>;
  //   }
  //     ? FormOptionsSchema extends { customFormControls?: infer R }
  //       ? R extends RequireAtLeastOne<
  //           Record<
  //             KeysUnder<ControlArgsSchema, keyof ControlArgsSchema>,
  //             infer A
  //           >
  //         >
  //         ? A extends { input: infer TComponent }
  //           ? InferPropsType<TComponent>
  //           : { name: string }
  //         : { name: string }
  //       : ReactInputProps
  //     : ReactInputProps
  // >
>;

//RequireAtLeastOne<Record<InputType, any>>;

// InferPropsType<
//           FormOptionsSchema['customFormControls']['text']['input']['component']
//         >

export function getFormControls<
  T extends object,
  Keys extends RecursiveKeyOf<T> | null,
  FormOptionsSchema,
  ControlArgsSchema extends FormControlArg<T, Keys>
>(
  inputControls: ControlArgsSchema
): GetFormControlsReturn<T, Keys, FormOptionsSchema, ControlArgsSchema> {
  const inputsArr = (Object.entries(inputControls) as [
    string,
    ControlType
  ][]).reduce((inputsAcc, [controlName, value]) => {
    const inputTypeObject = extractControlTypeValue(value);

    return {
      ...inputsAcc,
      [camelCase(controlName)]: {
        input: customFormControlsBuilder({
          componentType: 'input',
          name: controlName,
          controlType: Object.keys(inputTypeObject)[0],
        } as InputControl),
        label: customFormControlsBuilder({
          name: controlName,
          controlType: Object.keys(inputTypeObject)[0],
        } as LabelControl),
      },
    };
  }, {} as GetFormControlsReturn<T, Keys, FormOptionsSchema, ControlArgsSchema>);

  return inputsArr as GetFormControlsReturn<
    T,
    Keys,
    FormOptionsSchema,
    ControlArgsSchema
  >;
}
