import { useStore } from "@tanstack/react-form";
import type { ComponentProps } from "react";
import { useFormContext } from "#/components/form";
import { Button } from "#/components/ui/button";

type SubmitButtonProps = {
  children: React.ReactNode;
} & ComponentProps<typeof Button>;

export const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  return (
    <Button type="submit" disabled={!canSubmit} {...props}>
      {children}
    </Button>
  );
};
