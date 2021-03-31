import React from 'react';
import GlobalFileExample from './examples/GlobalFileExample';
import LocalConfigExample from './examples/LocalConfigExample';

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

const App = () => {
  return (
    <>
      <div>
        <h2>Local config</h2>
        <LocalConfigExample />
      </div>

      <div>
        <h2>Global File </h2>
        <GlobalFileExample />
      </div>
    </>
  );
};

export default App;
