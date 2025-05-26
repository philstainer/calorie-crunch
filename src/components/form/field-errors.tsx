import type { AnyFieldMeta } from "@tanstack/react-form";
import type { ZodError } from "zod";

type FieldErrorsProps = {
  meta: AnyFieldMeta;
};

export const FieldErrors = ({ meta }: FieldErrorsProps) => {
  if (!meta.isTouched) return null;

  return (
    <div className="flex flex-col">
      {meta.errors.map(({ message }: ZodError, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <span className="text-red-500 text-xs" key={index}>
          <em>{message}</em>
        </span>
      ))}
    </div>
  );
};
