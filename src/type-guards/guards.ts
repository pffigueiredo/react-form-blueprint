import { InputControl } from '../input';
import { LabelControl } from '../label';

export function isInput<T>(
  formControl: InputControl<T> | LabelControl<T>
): formControl is InputControl<T> {
  return (formControl as InputControl<T>).componentType !== undefined;
}

// used to make sure doesn't confuse any of these types with type 'never' => https://stackoverflow.com/a/56950114/11102792
export function extractFormControlValue<T>(
  formControl: InputControl<T> | LabelControl<T>
): InputControl<T> | LabelControl<T> {
  return formControl;
}
