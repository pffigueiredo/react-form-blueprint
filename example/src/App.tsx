import React, { useRef } from 'react';
import { getFormControls } from './react-formgen.config';
export interface Person {
  firstName: string;
  lastName: string;
  age: number;
  dog: {
    name: {
      age: string;
    };
  };
}

const formControls = getFormControls<Person, 'firstName' | 'lastName' | 'age' | 'dog.name'>([
  {
    type: 'text',
    name: 'firstName',
  },
  {
    type: 'text',
    name: 'lastName',
  },
  { type: 'number', name: 'age' },
  {
    type: 'text',
    name: 'dog.name',
  },
]);


const App = () => {
  const inputRef = useRef(null)
  const {firstName, age} = formControls;

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

export default App;
