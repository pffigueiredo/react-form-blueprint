import {
  ControlOptions,
  setControlOptionsInstance,
} from './controlOptionsInstance';
import { getFormControls } from './getFormControls';
import { ReactComponent } from './tsUtils';

type InitFormOptionsReturn = {
  getFormControls: typeof getFormControls;
};

export function initFormOptions<
  P = {},
  LabelT extends ReactComponent = 'label',
  InputT extends ReactComponent = 'input'
>(controlOptions: ControlOptions<P, LabelT, InputT>): InitFormOptionsReturn {
  setControlOptionsInstance(controlOptions);

  return {
    getFormControls,
  };
}
