import React from 'react';
import { initFormOptions } from '../../../src';
import { Person } from '../App';

const { getFormControls } = initFormOptions({
  label: { component: 'label' },
  input: {
    component: 'input',
    presetProps: { placeholder: 'Local configured' },
  },
  customFormControls: {
    text: { input: { component: Label }, label: { component: 'label' } },
    // number: { input: { component: Label }, label: { component: 'label' } },
  },
});

function Label(customLabel: { customLabel: string }) {
  return <h1></h1>;
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
    text: true,
  },
  age: {
    number: true,
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
