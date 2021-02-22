# react-formgen

> Generate input controls from your models

[![NPM](https://img.shields.io/npm/v/react-formgen.svg)](https://www.npmjs.com/package/react-formgen) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-formgen
```

## Usage

```tsx
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
```

## License

MIT © [pffigueiredo](https://github.com/pffigueiredo)
