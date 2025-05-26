import { useCustomForm } from "#/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Activity, Target, User } from "lucide-react";
import { z } from "zod";

export const FormAndResults = () => {
  const form = useCustomForm({
    defaultValues: {
      age: 0,
      gender: "male",
      weight: 0,
      height: 0,
      activityLevel: activityLevels[0].value,
      goal: "",
    },
    validators: {
      onChange: z.object({
        age: z.number().min(1),
        gender: z.enum(["male", "female"]),
        weight: z.number().min(1),
        height: z.number().min(1),
        activityLevel: z.string().min(1),
        goal: z.string().min(1),
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

        <CardContent className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <form.AppField
                name="age"
                children={(field) => <field.NumberField label="Age" />}
              />

              <form.AppField
                name="gender"
                children={(field) => (
                  <field.SelectField
                    label="Gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <form.AppField
                name="weight"
                children={(field) => <field.NumberField label="Weight (kg)" />}
              />

              <form.AppField
                name="height"
                children={(field) => <field.NumberField label="Height (cm)" />}
              />
            </div>

            <div className="space-y-2">
              <form.AppField
                name="activityLevel"
                children={(field) => (
                  <field.SelectField
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

            <div className="space-y-3">
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
              <form.SubmitButton className="flex-2">
                Calculate Calories
              </form.SubmitButton>
            </form.AppForm>
          </form>
        </CardContent>
      </Card>
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
