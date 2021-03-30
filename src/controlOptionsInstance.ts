import { InputType } from './input';

type CustomFormControls = Partial<Record<InputType, { input?: React.ReactElement; label?: React.ReactElement }>>;

export interface ControlOptions {
  customFormControls?: CustomFormControls;
  label?: React.ReactElement;
  input?: React.ReactElement;
}

const controlOptionsInstance: ControlOptions = {
  customFormControls: {},
};

export const getControlOptionsInstance = (): ControlOptions => controlOptionsInstance;
export const setControlOptionsInstance = (controlOptions: ControlOptions): void => {
  Object.assign(controlOptionsInstance, controlOptions);
};
