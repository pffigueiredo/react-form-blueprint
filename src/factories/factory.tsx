import React from 'react';
import { forwardRef } from 'react';
import { ReactInputProps } from '../input';
import { DEFAULT_INPUT, DEFAULT_LABEL } from '../constants';
import { getControlOptionsInstance } from '../formControlOptions';
import { FormControl } from '../getFormControls';
import { ReactLabelProps } from '../label';
import { isInput } from '../type-guards/guards';

const controlOptionsInstance = getControlOptionsInstance();

function buildUsableControl<T>(component: React.ReactElement, formControl: FormControl<T>) {
  if (isInput<T>(formControl)) {
    return forwardRef<HTMLInputElement, ReactInputProps>((props, forwardRef) =>
      React.cloneElement(component, {
        ...props,
        type: formControl.type,
        name: formControl.name,
        id: formControl.name,
        ref: forwardRef,
      })
    );
  }

  // is a label
  return forwardRef<HTMLLabelElement, ReactLabelProps>((props, forwardRef) =>
    React.cloneElement(component, {
      ...props,
      htmlFor: formControl.name,
      ref: forwardRef,
    })
  );
}

export function customFormControlsBuilder<T>(formControl: FormControl<T>): ReturnType<typeof buildUsableControl> {
  const customControlByType = controlOptionsInstance?.customFormControls?.[formControl.type];
  const formControlType = isInput<T>(formControl) ? 'input' : 'label';

  // by input type (text/number...)
  if (customControlByType?.[formControlType]) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return buildUsableControl(customControlByType[formControlType]!, formControl);
  }

  // globally defined in options (input/label)
  if (controlOptionsInstance[formControlType]) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return buildUsableControl(controlOptionsInstance[formControlType]!, formControl);
  }

  // if not defined (default)
  return buildUsableControl(isInput<T>(formControl) ? DEFAULT_INPUT : DEFAULT_LABEL, formControl);
}
