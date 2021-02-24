import React from 'react';
import { getElementInputs, initForm } from 'react-formgen';

initForm({ text: <input className="text" />, number: <input className="number" /> });

interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

const App = () => {
  const formControls = getElementInputs<Person>([
    {
      type: 'text',
      name: 'firstName',
    },
    { type: 'number', name: 'age' },
  ]);

  if (!formControls) return null;

  return (
    <>
      <formControls.firstName />
      <formControls.age />
    </>
  );
};

export default App;
