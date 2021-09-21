import { initFormOptions } from '../src/initFormOptions';
import * as React from 'react';
import { render, screen } from '@testing-library/react';

interface Person {
  firstName: string;
  age: number;
  dog: string;
}

describe('get the formControls by the defined blueprint', () => {
  it('should order by string asc', () => {
    const { getFormControls } = initFormOptions({});
    const formControls = getFormControls<Person>()({
      firstName: {
        type: 'text',
      },
      age: {
        type: 'number',
      },
      dog: {
        type: 'text',
      },
    });

    function TestRenderUi() {
      const { age, firstName } = formControls;

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
    }

    render(<TestRenderUi />);

    expect(screen.getByRole('textbox', { name: 'Firstname' })).toBeTruthy();
    expect(screen.getByRole('spinbutton', { name: 'Age' })).toBeTruthy();
  });
});
