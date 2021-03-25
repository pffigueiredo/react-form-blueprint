/* eslint-disable @typescript-eslint/ban-types */
// eslint-disable-next-line import/no-unresolved
import camelCase from 'camelcase';
import { customFormControlsBuilder } from './factories/factory';
import { LabelControl, ReactLabelProps } from './label';
import { InputControl, InputType, ReactInputProps } from './input';
import { AsString, DotNotationToCamelCase, RecursiveKeyOf } from './tsUtils';

export interface FormControl<T> {
  type: InputType;
  name: RecursiveKeyOf<T>;
}

type FormControlsReturnVal = {
  input: (props: ReactInputProps) => JSX.Element;
  label: (props: ReactLabelProps) => JSX.Element;
};

type GetFormControlsReturn<KeysToReturn extends string> = Record<
  DotNotationToCamelCase<KeysToReturn>,
  FormControlsReturnVal
>;

export function getFormControls<
  T extends object,
  Keys extends AsString<RecursiveKeyOf<T>> = AsString<RecursiveKeyOf<T>>
>(inputControls: InputControl<T>[]): GetFormControlsReturn<Keys> {
  const inputsArr = inputControls.reduce((inputsAcc, inputControl) => {
    return {
      ...inputsAcc,
      [camelCase(inputControl.name)]: {
        input: customFormControlsBuilder({ componentType: 'input', ...inputControl } as FormControl<T>),
        label: customFormControlsBuilder(inputControl as LabelControl<T>),
      },
    };
  }, {} as GetFormControlsReturn<Keys>);

  return inputsArr as GetFormControlsReturn<Keys>;
}
