import React from 'react';
import { initFormOptions } from '../../../dist';

const { getFormControls } = initFormOptions({
  label: { component: 'label' },
  input: {
    component: 'input',
    presetProps: { placeholder: 'Local configured' },
  },
  customFormControls: {
    text: {
      input: { component: Label },
      label: { component: 'label', presetProps: { htmlFor: '123' } },
    },
    // number: { input: { component: Label }, label: { component: 'label' } },
  },
});

function Label(customLabel: { customLabel: string }) {
  return <h1>Cona</h1>;
}

interface Person1 {
  firstName: string;
  age: number;
  dog: {
    age: string;
  };
}

const formControls = getFormControls<Person1, 'firstName' | 'age'>()({
  firstName: {
    type: 'text',
  },
  age: {
    type: 'number',
  },
});

const LocalConfigExample = () => {
  const { firstName, age } = formControls;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <age.label>Age</age.label>
        <age.input />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <firstName.label>Firstname</firstName.label>
        <firstName.input customLabel="123" />
      </div>
    </>
  );
};

export default LocalConfigExample;
