import { InputControl } from '../input';
import { LabelControl } from '../label';

export function isInput<T>(
  formControl: InputControl<T> | LabelControl<T>
): formControl is InputControl<T> {
  return (formControl as InputControl<T>).componentType !== undefined;
}
