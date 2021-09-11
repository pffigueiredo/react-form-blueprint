/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { forwardRef } from 'react';
import { DEFAULT_INPUT, DEFAULT_LABEL } from '../constants';
import { FormControl } from '../getFormControls';
import { extractFormControlValue, isInput } from '../type-guards/guards';
import { getControlOptionsInstance } from '../controlOptionsInstance';
import { ComponentWithProps, ReactComponent } from '../tsUtils';

const controlOptionsInstance = getControlOptionsInstance();

function buildUsableControl<C extends ReactComponent>(
  componentWithProps: ComponentWithProps<C>,
  formControl: FormControl
) {
  const formControlVal = extractFormControlValue(formControl);

  if (isInput(formControlVal)) {
    return forwardRef<
      ComponentWithProps<C>['component'],
      ComponentWithProps<C>['presetProps']
    >((props, forwardRef) =>
      React.createElement(componentWithProps.component, {
        ...componentWithProps.presetProps,
        ...props,

        type: formControlVal.controlType,
        name: formControlVal.name,
        id: formControlVal.name,
        ref: forwardRef,
      })
    );
  }

  // is a label
  return forwardRef<
    ComponentWithProps<C>['component'],
    ComponentWithProps<C>['presetProps']
  >((props, forwardRef) =>
    React.createElement(componentWithProps.component, {
      ...componentWithProps.presetProps,
      ...props,

      htmlFor: formControlVal.name,
      ref: forwardRef,
    })
  );
}

export function customFormControlsBuilder(
  formControl: FormControl
): ReturnType<typeof buildUsableControl> {
  const customControlByType =
    controlOptionsInstance?.customFormControls?.[formControl.controlType];
  const formControlType = isInput(formControl) ? 'input' : 'label';

  // by input type (text/number...)
  if (customControlByType?.[formControlType]) {
    return buildUsableControl(
      customControlByType[formControlType]!,
      formControl
    );
  }

  // by all input and labels
  if (controlOptionsInstance[formControlType]) {
    return buildUsableControl(
      controlOptionsInstance[formControlType]!,
      formControl
    );
  }

  // if not defined (default)
  return buildUsableControl(
    isInput(formControl) ? DEFAULT_INPUT : DEFAULT_LABEL,
    formControl
  );
}
