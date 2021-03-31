import { ControlOptions, setControlOptionsInstance } from './controlOptionsInstance';
import { getFormControls } from './getFormControls';

type InitFormOptionsReturn = {
  getFormControls: typeof getFormControls;
};

export function initFormOptions(controlOptions: ControlOptions): InitFormOptionsReturn {
  setControlOptionsInstance(controlOptions);

  return {
    getFormControls,
  };
}
