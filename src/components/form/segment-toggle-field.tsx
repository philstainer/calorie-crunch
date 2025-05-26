import { useFieldContext } from "#/components/form";
import { FieldErrors } from "#/components/form/field-errors";
import { Label } from "#/components/ui/label";

type Option = {
  value: string;
  label: string;
};

type SegmentToggleFieldProps = {
  label?: string | React.ReactNode;
  options: Option[];
};

export const SegmentToggleField = ({
  label,
  options,
}: SegmentToggleFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-1">
      <div className="space-y-2">
        {label && <Label htmlFor={field.name}>{label}</Label>}

        <div className="flex w-full items-center rounded-md bg-muted p-1">
          {options.map((option) => {
            const isSelected = field.state.value === option.value;

            return (
              <button
                key={option.value}
                onClick={() => field.handleChange(option.value)}
                className={`flex-1 py-1.5 text-sm font-medium rounded-sm transition-all ${
                  isSelected
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
