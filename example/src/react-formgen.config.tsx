import React from 'react';
import { initFormOptions } from 'react-formgen';

export const { getFormControls } = initFormOptions({
  customFormControls: {
    // text: { input: <input className="text" />, label: <label className="textLabel" /> },
    number: {
      input: <input className="number" />,
      label: <label className="textLabel" />,
    },
  },
  label: <label className="label" />,
  input: <input className="input" placeholder="global config" />,
});
