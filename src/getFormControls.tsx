/* eslint-disable import/no-unresolved */
import camelCase from 'camelcase';
import { customFormControlsBuilder } from './factories/factory';
import { LabelControl, ReactLabelProps } from './label';
import { InputControl, InputType, ReactInputProps } from './input';
import {
  DotNotationToCamelCase,
  InferPropsType,
  RecursiveKeyOf,
  RequireAtLeastOne,
  ValueOf,
} from './tsUtils';
import { extractControlTypeValue } from './type-guards/guards';

export type ControlType = {
  type: InputType;
};
export interface FormControl {
  controlType: InputType;
  name: string;
}

type FormControlsReturnVal<
  InputPropsT = ReactInputProps,
  LabelPropsT = ReactLabelProps
> = {
  input: (props: InputPropsT) => JSX.Element;
  label: (props: LabelPropsT) => JSX.Element;
};

type PropsByCustomControls<
  ReturnKey extends string,
  FormBluePrintT,
  ControlArgsSchemaT,
  ControlType extends 'label' | 'input'
> = FormBluePrintT extends {
  customFormControls?: RequireAtLeastOne<Record<InputType, any>>;
}
  ? FormBluePrintT extends { customFormControls?: infer CustomControlsT }
    ? ControlArgsSchemaT extends Record<ReturnKey, any>
      ? ValueOf<ControlArgsSchemaT[ReturnKey]> extends keyof CustomControlsT
        ? CustomPropsByControl<
            ControlType,
            CustomControlsT[ValueOf<ControlArgsSchemaT[ReturnKey]>],
            PropsByControl<ControlType, FormBluePrintT>
          >
        : PropsByControl<ControlType, FormBluePrintT>
      : PropsByControl<ControlType, FormBluePrintT>
    : PropsByControl<ControlType, FormBluePrintT>
  : PropsByControl<ControlType, FormBluePrintT>;

type CustomPropsByControl<
  C extends 'label' | 'input',
  CustomControlsByControl,
  ReturnType
> = C extends 'label'
  ? CustomControlsByControl extends {
      label: { component: infer TComponent };
    }
    ? InferPropsType<TComponent>
    : ReturnType
  : CustomControlsByControl extends {
      input: { component: infer TComponent };
    }
  ? InferPropsType<TComponent>
  : ReturnType;

type PropsByControl<
  C extends 'label' | 'input',
  FormBluePrintT
> = C extends 'label'
  ? PropsByLabel<FormBluePrintT>
  : PropsByInput<FormBluePrintT>;

type PropsByInput<FormBluePrintT> = FormBluePrintT extends {
  input?: { component: infer TComponent };
}
  ? InferPropsType<TComponent>
  : ReactInputProps;

type PropsByLabel<FormBluePrintT> = FormBluePrintT extends {
  label?: { component: infer TComponent };
}
  ? InferPropsType<TComponent>
  : ReactLabelProps;

type GetFormControlsReturn<
  T,
  KeysToReturn extends string | null,
  FormBluePrintT,
  ControlArgsSchemaT
> = {
  [ReturnKey in DotNotationToCamelCase<
    KeysToReturn extends null ? RecursiveKeyOf<T> : KeysToReturn
  >]: FormControlsReturnVal<
    PropsByCustomControls<
      ReturnKey,
      FormBluePrintT,
      ControlArgsSchemaT,
      'input'
    >,
    PropsByCustomControls<
      ReturnKey,
      FormBluePrintT,
      ControlArgsSchemaT,
      'label'
    >
  >;
};

export function getFormControls<
  T extends object,
  Keys extends RecursiveKeyOf<T> | null,
  FormOptionsSchema,
  ControlArgsSchema
>(
  inputControls: ControlArgsSchema
): GetFormControlsReturn<T, Keys, FormOptionsSchema, ControlArgsSchema> {
  const inputsArr = (Object.entries(inputControls) as [
    string,
    ControlType
  ][]).reduce((inputsAcc, [controlName, value]) => {
    const inputTypeObject = extractControlTypeValue(value);

    return {
      ...inputsAcc,
      [camelCase(controlName)]: {
        input: customFormControlsBuilder({
          componentType: 'input',
          name: controlName,
          controlType: inputTypeObject.type,
        } as InputControl),
        label: customFormControlsBuilder({
          name: controlName,
          controlType: inputTypeObject.type,
        } as LabelControl),
      },
    };
  }, {} as GetFormControlsReturn<T, Keys, FormOptionsSchema, ControlArgsSchema>);

  return inputsArr as GetFormControlsReturn<
    T,
    Keys,
    FormOptionsSchema,
    ControlArgsSchema
  >;
}
