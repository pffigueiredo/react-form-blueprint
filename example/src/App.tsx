import React from 'react';
import { getElementInputs, initFormOptions } from 'react-formgen';

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
    number: { input: <input className="number" /> },
  },
  label: <label className="label" />,
  input: <input className="input" />,
});
const formControls = getElementInputs<Person>([
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

  return (
    <>
      <formControls.firstName />
      <formControls.lastName />
      <formControls.age />
      <formControls.dog.name.age />
    </>
  );
};

export default App;
