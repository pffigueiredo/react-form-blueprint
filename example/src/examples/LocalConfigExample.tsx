import React from 'react';
import { initFormOptions } from '../../../src';
import { Person } from '../App';

const { getFormControls } = initFormOptions({
  label: { component: 'label' },
  input: {
    component: 'input',
    presetProps: { placeholder: 'Local configured' },
  },
});

const formControls = getFormControls<Person, 'firstName' | 'age'>([
  {
    type: 'text',
    name: 'firstName',
  },
  { type: 'number', name: 'age' },
]);

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
        <firstName.input />
      </div>
    </>
  );
};

export default LocalConfigExample;
