import React from 'react';
import { getFormControls, initFormOptions } from 'react-formgen';

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  dog: {
    name: {
      age: string;
    };
  };
}

initFormOptions({
  customFormControls: {
    // text: { input: <input className="text" />, label: <label className="textLabel" /> },
    number: { input: <input className="number" />, label: <label className="textLabel" /> },
  },
  label: <label className="label" />,
  input: <input className="input" />,
});
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
  if (!formControls) return null;

  const {firstName, age} = formControls;

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

export default App;
