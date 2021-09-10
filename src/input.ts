import React from 'react';
import { ControlType, FormControl } from './getFormControls';
import { RecursiveKeyOf } from './tsUtils';

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

export interface InputControl extends FormControl {
  componentType?: FormControlType;
}

export type FormControlArg<
  T,
  Keys extends RecursiveKeyOf<T> | null = null
> = Record<
  Keys extends null ? RecursiveKeyOf<T> : Keys,
  {
    componentType?: FormControlType;
  } & ControlType
>;

export type ReactInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
