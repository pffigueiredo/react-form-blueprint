import React from 'react';

const availableInputTypes = [
  'button',
  'checkbox',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week',
] as const;
type InputType = typeof availableInputTypes[number];

const availableFormControls = ['input', 'select', 'textarea'] as const;
type FormControlType = typeof availableFormControls[number];

// example { type:"text"; name: "firstName" }
export interface InputControl<T> {
  type: InputType;
  name: keyof T;
  component?: FormControlType;
}

type GetElementInputsReturn<T> = Record<
  keyof T,
  (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => JSX.Element
>;

export function getElementInputs<T extends Record<keyof T, unknown>>(
  inputControls: InputControl<T>[],
  customControlOptions: Partial<Record<InputType, React.ReactElement>>
): GetElementInputsReturn<T> {
  const inputsArr: GetElementInputsReturn<T> = inputControls.reduce((inputsAcc, inputControl) => {
    // const formControl: FormControlType = inputControl.component ?? 'input';
    return {
      ...inputsAcc,
      [inputControl.name]: (
        props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
      ) => {
        return (
          customControlOptions.text &&
          React.cloneElement(customControlOptions.text, { ...props, name: inputControl.name })
        );
      },
    };
  }, {} as GetElementInputsReturn<T>);

  return inputsArr;
}
