import { useFieldContext } from "#/components/form";
import { FieldErrors } from "#/components/form/field-errors";
import { Label } from "#/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";

type SelectOption = {
  value: string;
  label: string;
  description?: string;
};

type SelectFieldProps = {
  label: string | React.ReactNode;
  options: SelectOption[];
  placeholder?: string;
};

export const SelectField = ({
  label,
  options,
  placeholder,
}: SelectFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-1">
      <div className="space-y-2">
        <Label htmlFor={field.name}>{label}</Label>

        <Select
          value={field.state.value}
          onValueChange={(value) => field.handleChange(value)}
        >
          <SelectTrigger
            id={field.name}
            onBlur={field.handleBlur}
            className="w-full"
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <>
                      <span>-</span>
                      <div className="text-sm text-muted-foreground">
                        {option.description}
                      </div>
                    </>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
