import clsx from "clsx";
import type { ComponentProps } from "react";
import { useFieldContext } from "#/components/form";
import { FieldErrors } from "#/components/form/field-errors";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

type InputProps = ComponentProps<typeof Input>;

type TextFieldProps = {
  label: string;
} & InputProps;

export const TextField = ({ label, ...inputProps }: TextFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className={clsx("w-full space-y-1", inputProps.hidden && "hidden")}>
      <div className="space-y-2">
        <Label htmlFor={field.name}>{label}</Label>

        <Input
          id={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          {...inputProps}
        />
      </div>

      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
