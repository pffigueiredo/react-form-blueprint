import React from 'react';
import { initFormOptions } from '../../../src';

interface Person {
  firstName: string;
  age: number;
  dog: {
    color: string;
  };
}
const CustomInput = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div>
      <input type="radio" />
      <p>{errorMessage}</p>
    </div>
  );
};

const { getFormControls } = initFormOptions({
  customFormControls: {
    radio: {
      input: {
        component: CustomInput,
        presetProps: { errorMessage: 'Error dude!' },
      },
      label: { component: 'label' },
    },
  },
  label: { component: 'label' },
  input: { component: 'input' },
});

const formControls = getFormControls<
  Person,
  'firstName' | 'age' | 'dog.color'
>()({
  firstName: {
    type: 'text',
  },
  age: {
    type: 'number',
  },
  'dog.color': {
    type: 'radio',
  },
});

const ReadmeExample = () => {
  const { firstName, age, dogColor } = formControls;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <firstName.label>Firstname</firstName.label>
        <firstName.input />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <age.label>Age</age.label>
        <age.input />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <dogColor.label>Dog Color</dogColor.label>
        <dogColor.input />
      </div>
    </>
  );
};

export default ReadmeExample;
