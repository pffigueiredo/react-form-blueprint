import React from 'react';
import { FormControl } from './getFormControls';

export type LabelControl<T> = FormControl<T>;
export type ReactLabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;
