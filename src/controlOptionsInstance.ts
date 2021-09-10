import { ComponentWithProps, ReactComponent } from './tsUtils';
import { InputType } from './input';

type CustomizableType = 'input' | 'label';

//constraints  CustomFormControls so that it only accepts keys of type InputType
type KeyOfInputType<
  T extends Partial<Record<InputType, unknown>>
> = keyof T extends InputType ? T : Record<InputType, T[keyof T]>;

//constraints  CustomFormControls Form Controls so that it only accepts keys of type "input" | "label"
type KeyOfFormControl<
  T extends Partial<Record<CustomizableType, unknown>>
> = keyof T extends CustomizableType
  ? T
  : Record<'input' | 'label', T[keyof T]>;

type CustomFormControls<
  P extends Partial<Record<InputType, unknown>>
> = KeyOfInputType<
  {
    [I in keyof P]: KeyOfFormControl<
      {
        [IK in keyof P[I]]: P[I][IK] extends ReactComponent
          ? ComponentWithProps<P[I][IK]>
          : never;
      }
    >;
  }
>;

export interface ControlOptions<
  P,
  LabelT extends ReactComponent = ReactComponent,
  InputT extends ReactComponent = ReactComponent
> {
  customFormControls?: CustomFormControls<P>;
  label?: ComponentWithProps<LabelT>;
  input?: ComponentWithProps<InputT>;
}

const controlOptionsInstance: ControlOptions<{}> = {
  customFormControls: {},
  label: undefined,
  input: undefined,
};

export const getControlOptionsInstance = () => controlOptionsInstance;
export const setControlOptionsInstance = (controlOptions): void => {
  controlOptionsInstance.customFormControls = controlOptions.customFormControls;
  controlOptionsInstance.label = controlOptions.label;
  controlOptionsInstance.input = controlOptions.input;
};
