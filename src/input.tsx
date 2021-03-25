import React from 'react';
import { FormControl } from './getFormControls';

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

export interface InputControl<T> extends FormControl<T> {
  componentType?: FormControlType;
}

export type ReactInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
