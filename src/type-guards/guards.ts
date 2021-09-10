import { ControlType } from '../getFormControls';
import { InputControl } from '../input';
import { LabelControl } from '../label';

export function isInput(
  formControl: InputControl | LabelControl
): formControl is InputControl {
  return (formControl as InputControl).componentType !== undefined;
}

// used to make sure doesn't confuse any of these types with type 'never' => https://stackoverflow.com/a/56950114/11102792
export function extractFormControlValue(
  formControl: InputControl | LabelControl
): InputControl | LabelControl {
  return formControl;
}

// used to make sure doesn't confuse any of these types with type 'never' => https://stackoverflow.com/a/56950114/11102792
export function extractControlTypeValue(value: ControlType): ControlType {
  return value;
}
