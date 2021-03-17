import React, { ReactElement } from 'react';
import { FormControl } from './getFormControls';
import { getControlOptionsInstance } from './formControlOptions';
import { Nullable } from './tsUtils';

export type LabelControl<T> = FormControl<T>;

const controlOptionsInstance = getControlOptionsInstance();

function buildUsableLabel<T>(component: React.ReactElement, labelControl: LabelControl<T>) {
  return (props: ReactLabelProps): ReactElement<ReactLabelProps> => {
    return React.cloneElement(component, {
      ...props,
      htmlFor: labelControl.name,
    });
  };
}

export type ReactLabelProps = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
export function customLabelsBuilder<T>(
  labelControl: LabelControl<T>
): (props: ReactLabelProps) => Nullable<ReactElement> {
  const customControlByType = controlOptionsInstance?.customFormControls?.[labelControl.type];

  if (customControlByType?.label) {
    return buildUsableLabel(customControlByType.label, labelControl);
  }

  if (controlOptionsInstance.label) {
    return buildUsableLabel(controlOptionsInstance.label, labelControl);
  }

  return (props: ReactLabelProps): ReactElement<ReactLabelProps> => (
    <label {...props} htmlFor={String(labelControl.name)} />
  );
}
