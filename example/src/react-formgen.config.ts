import { initFormOptions } from '../../src';

export const { getFormControls } = initFormOptions({
  // customFormControls: {
  //   // text: { input: <input className="text" />, label: <label className="textLabel" /> },
  //   number: {
  //     input: <input className="number" />,
  //     label: <label className="textLabel" />,
  //   },
  // },

  customFormControls: {
    text: { input: { component: 'label' }, label: { component: 'label' } },
    // number: {
    //   input: { component: 'input' },
    //   label: { component: 'label' },
    // },
  },
  label: { component: 'label', presetProps: { className: '123' } },
  input: { component: 'input', presetProps: { placeholder: 'global defined' } },
});
