import React from 'react';
import { initFormOptions } from 'react-formgen';
import { Person } from '../App';

const { getFormControls } = initFormOptions({
  label: <label />,
  input: <input placeholder="local config label" />,
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
