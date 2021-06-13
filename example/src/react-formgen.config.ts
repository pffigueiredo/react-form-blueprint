import { initFormOptions } from '../../src';

export const { getFormControls } = initFormOptions({
  // customFormControls: {
  //   // text: { input: <input className="text" />, label: <label className="textLabel" /> },
  //   number: {
  //     input: <input className="number" />,
  //     label: <label className="textLabel" />,
  //   },
  // },
  label: { component: 'label' },
  input: { component: 'input', presetProps: { placeholder: 'global defined' } },
});
