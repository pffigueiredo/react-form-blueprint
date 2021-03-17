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
import { getFormControls, initFormOptions } from 'react-formgen';

interface Person {
  firstName: string;
  age: number;
  dog: {
    color: string;
  };
}

initFormOptions({
  customFormControls: {
    number: { input: <input className="number" />, label: <label className="textLabel" /> },
  },
  label: <label className="label" />,
  input: <input className="input" />,
});

const formControls = getFormControls<Person, 'firstName' | 'age' | 'dog.color'>([
  {
    type: 'text',
    name: 'firstName',
  },
  { type: 'number', name: 'age' },
  {
    type: 'text',
    name: 'dog.color',
  },
]);

const App = () => {
  if (!formControls) return null;

  const { firstName, age, dogColor } = formControls;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <firstName.label>Firstname</firstName.label>
        <firstName.input />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <age.label>Age</age.label>
        <age.input />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <dogColor.label>Dog Color</dogColor.label>
        <dogColor.input />
      </div>
    </>
  );
};

export default App;
```

## License

MIT © [pffigueiredo](https://github.com/pffigueiredo)
