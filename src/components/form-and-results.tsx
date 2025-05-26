import { useCustomForm, useFieldContext } from "#/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import type { AnyFieldApi, FieldApi } from "@tanstack/react-form";
import { Activity, Target, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

export const FormAndResults = () => {
  const form = useCustomForm({
    defaultValues: {
      unit: "metric",
      age: 0,
      gender: "",
      weight: 0,
      height: 0,
      activityLevel: "",
      goal: goals[1].value,
    },
    validators: {
      onChange: z.object({
        unit: z.enum(["metric", "imperial"]),
        age: z.number().min(1, "Please enter your age"),
        gender: z.enum(["male", "female"], {
          message: "Please select a gender",
        }),
        weight: z.number().min(1, "Please enter your weight"),
        height: z.number().min(1, "Please enter your height"),
        activityLevel: z.string().min(1, "Please select an activity level"),
        goal: z.string().min(1, "Please select a goal"),
      }),
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Enter your basic information to calculate your caloric needs
          </CardDescription>
        </CardHeader>

        <CardContent className="">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-2"
          >
            <form.AppField
              name="unit"
              children={(field) => (
                <field.SegmentToggleField
                  options={[
                    { value: "imperial", label: "Imperial" },
                    { value: "metric", label: "Metric" },
                  ]}
                />
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <form.AppField
                name="age"
                children={(field) => (
                  <field.NumberField placeholder="25" label="Age" />
                )}
              />

              <form.AppField
                name="gender"
                children={(field) => (
                  <field.SelectField
                    label="Gender"
                    placeholder="Select gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                  />
                )}
              />
            </div>

            <form.Subscribe
              selector={(state) => state.values.unit}
              children={(unit) => {
                return (
                  <div className="grid grid-cols-2 gap-4">
                    <form.AppField
                      name="weight"
                      children={(field) => {
                        const label =
                          unit === "imperial" ? "Weight (lbs)" : "Weight (kg)";

                        const value =
                          field.state.value === 0
                            ? ""
                            : unit === "imperial"
                            ? Math.floor(kgToLb(field.state.value))
                            : Math.floor(field.state.value);

                        const onChange = (
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const value = +e.target.value;

                          if (Number.isNaN(Number(value))) return;

                          if (unit === "imperial")
                            return field.handleChange(lbToKg(value));

                          field.handleChange(value);
                        };

                        const placeholder = unit === "imperial" ? "150" : "60";

                        return (
                          <field.NumberField
                            placeholder={placeholder}
                            label={label}
                            value={value}
                            onChange={onChange}
                          />
                        );
                      }}
                    />

                    {unit === "imperial" ? (
                      <form.Field
                        name="height"
                        children={(field) => (
                          <ImperialHeightField field={field} />
                        )}
                      />
                    ) : (
                      <form.AppField
                        name="height"
                        children={(field) => (
                          <field.NumberField
                            label="Height (cm)"
                            placeholder="175"
                          />
                        )}
                      />
                    )}
                  </div>
                );
              }}
            />

            <div className="space-y-2">
              <form.AppField
                name="activityLevel"
                children={(field) => (
                  <field.SelectField
                    placeholder="Select activity level"
                    label={
                      <div className="flex items-center gap-2">
                        <Activity className="size-4" />
                        Activity Level
                      </div>
                    }
                    options={activityLevels}
                  />
                )}
              />
            </div>

            <div className="py-2">
              <form.AppField
                name="goal"
                children={(field) => (
                  <field.RadioGroupField
                    label={
                      <div className="flex items-center gap-2">
                        <Target className="size-4" />
                        Goal
                      </div>
                    }
                    options={goals}
                  />
                )}
              />
            </div>

            <form.AppForm>
              <form.SubmitButton className="w-full">
                Calculate Calories
              </form.SubmitButton>
            </form.AppForm>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const ImperialHeightField = ({ field }: { field: AnyFieldApi }) => {
  const [state, setState] = useState<{
    feet: number;
    inches: number;
  }>({
    feet: 0,
    inches: 0,
  });

  const value = field.state.value as number;

  useEffect(() => {
    if (!value) return;

    const result = cmToFeetInches(value);
    setState({ feet: result.feet, inches: result.inches });
  }, [value]);

  const handleUpdateUnit = (unit: "feet" | "inches", value: number) => {
    const newState = { ...state, [unit]: value };

    setState(newState);

    const result = feetInchesToCm(newState.feet, newState.inches);
    field.handleChange(result);
  };

  return (
    <div className="flex gap-2">
      <div className="w-full space-y-1">
        <div className="space-y-2">
          <Label htmlFor="height-feet">Height (ft)</Label>

          <Input
            id="height-feet"
            placeholder="5"
            value={state.feet === 0 ? "" : state.feet}
            onChange={(e) => handleUpdateUnit("feet", +e.target.value)}
            onBlur={field.handleBlur}
            type="number"
          />
        </div>
      </div>

      <span className="flex items-center text-sm text-muted-foreground">
        ft
      </span>

      <div className="w-full space-y-1">
        <div className="space-y-2">
          <Label htmlFor="height-inches">Height (ft)</Label>

          <Input
            id="height-inches"
            placeholder="9"
            value={state.inches === 0 ? "" : state.inches}
            onChange={(e) => handleUpdateUnit("inches", +e.target.value)}
            onBlur={field.handleBlur}
            type="number"
          />
        </div>
      </div>
      <span className="flex items-center text-sm text-muted-foreground">
        in
      </span>
    </div>
  );
};

const activityLevels = [
  { value: "1.2", label: "Sedentary", description: "Little or no exercise" },
  {
    value: "1.375",
    label: "Lightly Active",
    description: "Light exercise 1-3 days/week",
  },
  {
    value: "1.55",
    label: "Moderately Active",
    description: "Moderate exercise 3-5 days/week",
  },
  {
    value: "1.725",
    label: "Very Active",
    description: "Hard exercise 6-7 days/week",
  },
  {
    value: "1.9",
    label: "Extremely Active",
    description: "Very hard exercise, physical job",
  },
];

const goals = [
  {
    value: "lose",
    label: "Lose Weight",
    description: "1 lb per week",
    adjustment: -500,
  },
  {
    value: "maintain",
    label: "Maintain Weight",
    description: "Stay at current weight",
    adjustment: 0,
  },
  {
    value: "gain",
    label: "Gain Weight",
    description: "1 lb per week",
    adjustment: 500,
  },
];

function cmToFeetInches(cm: number) {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = +(totalInches % 12).toFixed(2);

  return { feet, inches };
}

function feetInchesToCm(feet: number, inches = 0) {
  const totalInches = feet * 12 + inches;
  const cm = totalInches * 2.54;
  return parseFloat(cm.toFixed(2));
}

function kgToLb(kg: number) {
  return kg * 2.20462;
}

function lbToKg(lb: number) {
  return lb / 2.20462;
}
