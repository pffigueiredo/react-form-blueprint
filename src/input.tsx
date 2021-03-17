import React, { ReactElement } from 'react';
import { FormControl } from './getFormControls';
import { getControlOptionsInstance } from './formControlOptions';
import { Nullable } from './tsUtils';

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

const controlOptionsInstance = getControlOptionsInstance();

function buildUsableInput<T>(component: React.ReactElement, inputControl: InputControl<T>) {
  return (props: ReactInputProps): ReactElement<ReactInputProps> => {
    return React.cloneElement(component, {
      ...props,
      type: inputControl.type,
      name: inputControl.name,
      id: inputControl.name,
    });
  };
}

export type ReactInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export function customInputsBuilder<T>(
  inputControl: InputControl<T>
): (props: ReactInputProps) => Nullable<ReactElement> {
  const customControlByType = controlOptionsInstance?.customFormControls?.[inputControl.type];

  // by input type (text/number...)
  if (customControlByType?.input) {
    return buildUsableInput(customControlByType.input, inputControl);
  }

  // globally defined in options (input/label)
  if (controlOptionsInstance.input) {
    return buildUsableInput(controlOptionsInstance.input, inputControl);
  }

  // if not defined (default)
  return (props: ReactInputProps): ReactElement<ReactInputProps> => (
    <input {...props} name={String(inputControl.name)} type={inputControl.type} id={inputControl.name} />
  );
}
