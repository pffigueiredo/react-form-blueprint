import {
  ControlOptions,
  setControlOptionsInstance,
} from './controlOptionsInstance';
import { getFormControls } from './getFormControls';
import { FormControlArg } from './input';
import { ReactComponent, RecursiveKeyOf } from './tsUtils';


type InputControlsArg<InferredArg, ReturnKeys> = {
  [Key in keyof InferredArg]: Exclude<Key, keyof ReturnKeys> extends never
    ? InferredArg[Key]
    // eslint-disable-next-line prettier/prettier
    : `${Key extends string ? Key : 'This key'} isn't included in the available keys`;
};


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
        inputControls: InputControlsArg<InputControlsT, FormControlArg<T, Keys>>
      ) {
        return getFormControls<
          T,
          Keys,
          ControlOptions<P, LabelT, InputT>,
          InputControlsT
        >(inputControls as InputControlsT);
      };
    },
  };
}
