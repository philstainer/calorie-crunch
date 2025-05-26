import { useFieldContext } from "#/components/form";
import { FieldErrors } from "#/components/form/field-errors";
import { Label } from "#/components/ui/label";
import { RadioGroup, RadioGroupItem } from "#/components/ui/radio-group";

type Option = {
  value: string;
  label: string;
  description?: string;
};

type RadioGroupFieldProps = {
  label: string | React.ReactNode;
  options: Option[];
  placeholder?: string;
};

export const RadioGroupField = ({ label, options }: RadioGroupFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-1">
      <div className="space-y-2">
        <Label htmlFor={field.name}>{label}</Label>

        <RadioGroup
          value={field.state.value}
          onValueChange={(value) => field.handleChange(value)}
          className="space-y-2"
        >
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />

              <Label
                htmlFor={option.value}
                className="flex-1 cursor-pointer flex-col items-start gap-1/2"
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-muted-foreground">
                  {option.description}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
