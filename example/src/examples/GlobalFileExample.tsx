import React, { useRef } from 'react';
import { Person } from '../App';
import { getFormControls } from '../react-formgen.config';

const formControls = getFormControls<
  Person,
  'firstName' | 'lastName' | 'age' | 'dog.name'
>()({
  firstName: {
    type: 'text',
  },
  lastName: {
    type: 'text',
  },
  age: {
    type: 'radio',
  },
  'dog.name': {
    type: 'text',
  },
});

const GlobalFileExample = () => {
  const inputRef = useRef(null);
  const { firstName, age } = formControls;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <age.label>Age</age.label>
        <age.input ref={inputRef} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <firstName.label>Firstname</firstName.label>
        <firstName.input />
      </div>
    </>
  );
};

export default GlobalFileExample;
