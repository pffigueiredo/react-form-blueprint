import React from 'react';
import camelCase from 'camelcase';
import { AsString, DotNotationToCamelCase, RecursiveKeyOf } from './tsUtils';
import { customFormControlsBuilder } from './formControlOptions';

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
export type InputType = typeof availableInputTypes[number];

const availableFormControls = ['input', 'select', 'textarea'] as const;
type FormControlType = typeof availableFormControls[number];

// example { type:"text"; name: "firstName" }
export interface InputControl<T> {
  type: InputType;
  name: RecursiveKeyOf<T>;
  component?: FormControlType;
}

type GetElementInputsReturn<KeysToReturn extends string> = Record<
  DotNotationToCamelCase<KeysToReturn>,
  (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => JSX.Element
>;

export function getElementInputs<
  T extends Record<keyof T, unknown>,
  Keys extends AsString<RecursiveKeyOf<T>> = AsString<RecursiveKeyOf<T>>
>(inputControls: InputControl<T>[]): GetElementInputsReturn<Keys> {
  const inputsArr = inputControls.reduce((inputsAcc, inputControl) => {
    // const formControl: FormControlType = inputControl.component ?? 'input';
    return {
      ...inputsAcc,
      [camelCase(inputControl.name)]: customFormControlsBuilder(inputControl),
    };
  }, {} as GetElementInputsReturn<Keys>);

  return inputsArr as GetElementInputsReturn<Keys>;
}
