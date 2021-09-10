import React from 'react';
import GlobalFileExample from './examples/GlobalFileExample';
import LocalConfigExample from './examples/LocalConfigExample';
import ReadmeExample from './examples/ReadmeExample';

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

      <div>
        <h2>Readme Example </h2>
        <ReadmeExample />
      </div>
    </>
  );
};

export default App;
