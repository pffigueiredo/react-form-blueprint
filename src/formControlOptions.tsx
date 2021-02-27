import React, { ReactElement } from 'react';
import { Nullable } from './tsUtils';
import { InputControl, InputType } from './getElementInputs';

type CustomFormControls = Partial<Record<InputType, { input?: React.ReactElement; label?: React.ReactElement }>>;
interface ControlOptions {
  customFormControls?: CustomFormControls;
  label?: React.ReactElement;
  input?: React.ReactElement;
}

export const controlOptionsInstance: ControlOptions = {
  customFormControls: {},
};

export function initFormOptions(controlOptions: ControlOptions): void {
  controlOptionsInstance.customFormControls = controlOptions.customFormControls;
  controlOptionsInstance.label = controlOptions.label;
  controlOptionsInstance.input = controlOptions.input;
}

function buildUsableFormControl<T>(component: React.ReactElement, inputControl: InputControl<T>) {
  return (props: ReactInputProps): ReactElement<ReactInputProps> => {
    return React.cloneElement(component, {
      ...props,
      type: inputControl.type,
      name: inputControl.name,
    });
  };
}

type ReactInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export function customFormControlsBuilder<T>(
  inputControl: InputControl<T>
): (props: ReactInputProps) => Nullable<ReactElement> {
  const customControl = controlOptionsInstance?.customFormControls?.[inputControl.type];

  if (customControl?.input) {
    return buildUsableFormControl(customControl.input, inputControl);
  }

  if (controlOptionsInstance.input) {
    return buildUsableFormControl(controlOptionsInstance.input, inputControl);
  }

  return (props: ReactInputProps): ReactElement<ReactInputProps> => {
    return <input {...props} name={String(inputControl.name)} type={inputControl.type} />;
  };
}
