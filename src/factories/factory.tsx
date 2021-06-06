/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { forwardRef } from 'react';
import { ReactInputProps } from '../input';
import { DEFAULT_INPUT, DEFAULT_LABEL } from '../constants';
import { FormControl } from '../getFormControls';
import { ReactLabelProps } from '../label';
import { extractFormControlValue, isInput } from '../type-guards/guards';
import { getControlOptionsInstance } from '../controlOptionsInstance';

const controlOptionsInstance = getControlOptionsInstance();

function buildUsableControl<T>(
  component: React.ReactElement,
  formControl: FormControl<T>
) {
  const formControlVal = extractFormControlValue<T>(formControl);

  if (isInput<T>(formControlVal)) {
    return forwardRef<HTMLInputElement, ReactInputProps>((props, forwardRef) =>
      React.cloneElement(component, {
        ...props,
        type: formControlVal.type,
        name: formControlVal.name,
        id: formControlVal.name,
        ref: forwardRef,
      })
    );
  }

  // is a label
  return forwardRef<HTMLLabelElement, ReactLabelProps>((props, forwardRef) =>
    React.cloneElement(component, {
      ...props,
      htmlFor: formControlVal.name,
      ref: forwardRef,
    })
  );
}

export function customFormControlsBuilder<T>(
  formControl: FormControl<T>
): ReturnType<typeof buildUsableControl> {
  const customControlByType =
    controlOptionsInstance?.customFormControls?.[formControl.type];
  const formControlType = isInput<T>(formControl) ? 'input' : 'label';

  // by input type (text/number...)
  if (customControlByType?.[formControlType]) {
    return buildUsableControl(
      customControlByType[formControlType]!,
      formControl
    );
  }

  // globally defined in options (input/label)
  if (controlOptionsInstance[formControlType]) {
    return buildUsableControl(
      controlOptionsInstance[formControlType]!,
      formControl
    );
  }

  // if not defined (default)
  return buildUsableControl(
    isInput<T>(formControl) ? DEFAULT_INPUT : DEFAULT_LABEL,
    formControl
  );
}
