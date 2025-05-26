import clsx from "clsx";
import type { ComponentProps } from "react";
import { useFieldContext } from "#/components/form";
import { FieldErrors } from "#/components/form/field-errors";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

type InputProps = ComponentProps<typeof Input>;

type NumberFieldProps = {
  label?: string;
} & InputProps;

export const NumberField = ({ label, ...inputProps }: NumberFieldProps) => {
  const field = useFieldContext<number | undefined>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;

    if (Number.isNaN(Number(value))) return;

    field.handleChange(value);
  };

  return (
    <div className={clsx("w-full space-y-1", inputProps.hidden && "hidden")}>
      <div className="space-y-2">
        {label && <Label htmlFor={field.name}>{label}</Label>}

        <Input
          id={field.name}
          value={field.state.value === 0 ? "" : field.state.value}
          onChange={handleOnChange}
          onBlur={field.handleBlur}
          type="number"
          {...inputProps}
        />
      </div>

      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
