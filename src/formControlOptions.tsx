import React from 'react';
import { InputType } from './input';

type CustomFormControls = Partial<Record<InputType, { input?: React.ReactElement; label?: React.ReactElement }>>;

interface ControlOptions {
  customFormControls?: CustomFormControls;
  label?: React.ReactElement;
  input?: React.ReactElement;
}

const controlOptionsInstance: ControlOptions = {
  customFormControls: {},
};

export const getControlOptionsInstance = (): ControlOptions => controlOptionsInstance;

export function initFormOptions(controlOptions: ControlOptions): void {
  controlOptionsInstance.customFormControls = controlOptions.customFormControls;
  controlOptionsInstance.label = controlOptions.label;
  controlOptionsInstance.input = controlOptions.input;
}
