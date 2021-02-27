import React, { ReactElement } from 'react';
import { InputControl, InputType } from './getElementInputs';

interface ControlOptionsModel {
  customFormControls: Partial<Record<InputType, React.ReactElement>>;
}

export const ControlOptions: ControlOptionsModel = {
  customFormControls: {},
};

export function initFormOptions(customControlOptions: Partial<Record<InputType, React.ReactElement>>): void {
  ControlOptions.customFormControls = customControlOptions;
}

type ReactInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export function customFormControlsBuilder<T>(inputControl: InputControl<T>): (props: ReactInputProps) => ReactElement {
  const customControl = ControlOptions.customFormControls[inputControl.type];

  if (customControl) {
    return (props: ReactInputProps): ReactElement<ReactInputProps> => {
      return React.cloneElement(customControl, { ...props, name: inputControl.name });
    };
  }

  return (props: ReactInputProps): ReactElement<ReactInputProps> => {
    return <input {...props} name={String(inputControl.name)} type={inputControl.type} />;
  };
}
