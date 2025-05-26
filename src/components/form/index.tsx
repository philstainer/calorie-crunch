import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { SelectField } from "#/components/form/select-field";
import { SubmitButton } from "#/components/form/submit-button";
import { TextField } from "#/components/form/text-field";
import { RadioGroupField } from "#/components/form/radio-group";
import { NumberField } from "#/components/form/number-field";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm: useCustomForm } = createFormHook({
  fieldComponents: {
    TextField,
    NumberField,
    SelectField,
    RadioGroupField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
