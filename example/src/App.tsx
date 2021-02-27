import React from 'react';
import { getElementInputs, initFormOptions } from 'react-formgen';

interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

initFormOptions({ text: <input className="text" />, number: <input className="number" /> });
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
]);

const App = () => {
  if (!formControls) return null;

  return (
    <>
      <formControls.firstName />
      <formControls.lastName />
      <formControls.age />
    </>
  );
};

export default App;
