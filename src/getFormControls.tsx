/* eslint-disable import/no-unresolved */
import camelCase from 'camelcase';
import { customFormControlsBuilder } from './factories/factory';
import { LabelControl, ReactLabelProps } from './label';
import { InputControl, InputType, ReactInputProps } from './input';
import { DotNotationToCamelCase, RecursiveKeyOf } from './tsUtils';

export interface FormControl<T, Keys = null> {
  type: InputType;
  name: Keys extends null ? RecursiveKeyOf<T> : Keys;
}

type FormControlsReturnVal = {
  input: (props: ReactInputProps) => JSX.Element;
  label: (props: ReactLabelProps) => JSX.Element;
};

type GetFormControlsReturn<T, KeysToReturn extends string | null> = Record<
  DotNotationToCamelCase<
    KeysToReturn extends string ? KeysToReturn : RecursiveKeyOf<T>
  >,
  FormControlsReturnVal
>;

export function getFormControls<
  T extends object,
  Keys extends RecursiveKeyOf<T> | null = null
>(inputControls: InputControl<T, Keys>[]): GetFormControlsReturn<T, Keys> {
  const inputsArr = inputControls.reduce((inputsAcc, inputControl) => {
    return {
      ...inputsAcc,
      [camelCase(inputControl.name)]: {
        input: customFormControlsBuilder({
          componentType: 'input',
          ...inputControl,
        } as FormControl<T>),
        label: customFormControlsBuilder(inputControl as LabelControl<T>),
      },
    };
  }, {} as GetFormControlsReturn<T, Keys>);

  return inputsArr as GetFormControlsReturn<T, Keys>;
}
