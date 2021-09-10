import {
  ControlOptions,
  setControlOptionsInstance,
} from './controlOptionsInstance';
import { getFormControls } from './getFormControls';
import { FormControlArg } from './input';
import { ReactComponent, RecursiveKeyOf } from './tsUtils';

export function initFormOptions<
  P,
  LabelT extends ReactComponent = 'label',
  InputT extends ReactComponent = 'input'
>(controlOptions: ControlOptions<P, LabelT, InputT>) {
  setControlOptionsInstance(controlOptions);

  return {
    getFormControls: function<
      T extends object,
      Keys extends RecursiveKeyOf<T> | null = null
    >() {
      return function<InputControlsT extends FormControlArg<T, Keys>>(
        inputControls: InputControlsT
      ) {
        return getFormControls<
          T,
          Keys,
          ControlOptions<P, LabelT, InputT>,
          InputControlsT
        >(inputControls);
      };
    },
  };
}
