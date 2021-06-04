import { InputType } from './input';

// infers the prop types to be used in presetProps
type InferPropsType<PropT> = PropT extends React.ComponentType<infer V> ? V : never;
type CustomizableType = 'input' | 'label';

//constraints  CustomFormControls so that it only accepts keys of type InputType
type KeyOfInputType<T extends Partial<Record<InputType, unknown>>> = keyof T extends InputType
  ? T
  : Record<InputType, T[keyof T]>;
//constraints  CustomFormControls Form Controls so that it only accepts keys of type "input" | "label"
type KeyOfFormControl<T extends Partial<Record<CustomizableType, unknown>>> = keyof T extends CustomizableType
  ? T
  : Record<'input' | 'label', T[keyof T]>;

type CustomFormControls<P extends Partial<Record<InputType, unknown>>> = KeyOfInputType<
  {
    [I in keyof P]: KeyOfFormControl<
      { [IK in keyof P[I]]: { component: P[I][IK]; presetProps: InferPropsType<P[I][IK]> } }
    >;
  }
>;

export interface ControlOptions<P = {}> {
  customFormControls?: CustomFormControls<P>;
  label?: React.ReactElement;
  input?: React.ReactElement;
}

const controlOptionsInstance: ControlOptions<{}> = {
  customFormControls: {},
  label: undefined,
  input: undefined,
};

export const getControlOptionsInstance = (): ControlOptions =>
  controlOptionsInstance;
export const setControlOptionsInstance = (
  controlOptions: ControlOptions
): void => {
  controlOptionsInstance.customFormControls = controlOptions.customFormControls;
  controlOptionsInstance.label = controlOptions.label;
  controlOptionsInstance.input = controlOptions.input;
};
