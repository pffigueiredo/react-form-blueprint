import { initFormOptions } from '../../src';

export const { getFormControls } = initFormOptions({
  customFormControls: {
    text: { input: { component: 'input' }, label: { component: 'label' } },
    number: {
      input: { component: 'input' },
      label: { component: 'label' },
    },
  },
  label: { component: 'label', presetProps: { className: '123' } },
  input: { component: 'input', presetProps: { placeholder: 'global defined' } },
});
