import React from 'react';
import { FormControl } from './getFormControls';

export type LabelControl = FormControl;
export type ReactLabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;
