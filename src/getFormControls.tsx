/* eslint-disable @typescript-eslint/ban-types */
// eslint-disable-next-line import/no-unresolved
import camelCase from 'camelcase';
import { LabelControl, ReactLabelProps, customLabelsBuilder } from './label';
import { InputControl, InputType, ReactInputProps, customInputsBuilder } from './input';
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
    // const formControl: FormControlType = inputControl.component ?? 'input';
    return {
      ...inputsAcc,
      [camelCase(inputControl.name)]: {
        input: customInputsBuilder(inputControl),
        label: customLabelsBuilder(inputControl as LabelControl<T>),
      },
    };
  }, {} as GetFormControlsReturn<Keys>);

  return inputsArr as GetFormControlsReturn<Keys>;
}
