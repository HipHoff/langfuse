import { type ReactElement } from "react";

export function FormFieldset({
  label,
  children,
}: {
  label: string;
  children: ReactElement;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="pb-2 text-sm leading-none font-bold">{label}</legend>
      {children}
    </fieldset>
  );
}
