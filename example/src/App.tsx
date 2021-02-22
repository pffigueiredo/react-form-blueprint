import React from 'react';
import { getElementInputs } from 'react-formgen';

interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

const App = () => {
  const formControls = getElementInputs<Person>(
    [
      {
        type: 'text',
        name: 'firstName',
      },
      { type: 'text', name: 'lastName' },
    ],
    { text: <input /> }
  );

  return (
    <>
      <formControls.firstName className="test" />
      <formControls.lastName />
    </>
  );
};

export default App;
