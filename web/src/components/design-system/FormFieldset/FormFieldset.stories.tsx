import { expect, within } from "storybook/test";
import { useForm } from "react-hook-form";

import preview from "../../../../.storybook/preview";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { FormFieldset } from "./FormFieldset";

const meta = preview.meta({
  component: FormFieldset,
  args: {
    children: (
      <div className="grid grid-cols-2 gap-2">
        <Input aria-label="Header name" placeholder="Header name" />
        <Input aria-label="Header value" placeholder="Value" />
      </div>
    ),
  },
});

export const Default = meta.story({
  name: "(Test) Grouped inputs",
  args: {
    label: "Headers",
  },
  render: (args) => <Form.Fieldset {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = within(canvas.getByRole("group", { name: "Headers" }));

    await expect(
      group.getByRole("textbox", { name: "Header name" }),
    ).toBeVisible();
    await expect(
      group.getByRole("textbox", { name: "Header value" }),
    ).toBeVisible();
  },
});

export const AddressFields = meta.story({
  name: "(Test) Individually labeled fields",
  args: {
    label: "Address",
  },
  render: function AddressFields(args) {
    const form = useForm<{ city: string; postalCode: string }>({
      defaultValues: { city: "", postalCode: "" },
    });

    return (
      <Form.Fieldset {...args}>
        <div className="grid grid-cols-2 gap-4">
          <Form.InputField
            control={form.control}
            name="city"
            label="City"
            placeholder="Berlin"
          />
          <Form.InputField
            control={form.control}
            name="postalCode"
            label="Postal code"
            placeholder="10115"
          />
        </div>
      </Form.Fieldset>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = within(canvas.getByRole("group", { name: "Address" }));

    await expect(group.getByRole("textbox", { name: "City" })).toBeVisible();
    await expect(
      group.getByRole("textbox", { name: "Postal code" }),
    ).toBeVisible();
  },
});

export const CustomField = meta.story({
  name: "(Test) Stacked custom field",
  args: {
    label: "Notifications",
  },
  render: function CustomField(args) {
    const form = useForm<{ email: string; frequency: string }>({
      defaultValues: { email: "", frequency: "daily" },
    });

    return (
      <Form.Fieldset {...args}>
        <div className="flex flex-col gap-4">
          <Form.Field
            control={form.control}
            name="email"
            label="Email address"
            description="Where notification summaries are sent."
          >
            {(field) => (
              <Input
                id={field.id}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                type="email"
                aria-describedby={field.inputDescribedById}
                aria-invalid={Boolean(field.error)}
                error={Boolean(field.error)}
              />
            )}
          </Form.Field>
          <Form.SelectInputField
            control={form.control}
            name="frequency"
            label="Frequency"
            placeholder="Select a frequency"
            options={[
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
            ]}
          />
        </div>
      </Form.Fieldset>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = within(canvas.getByRole("group", { name: "Notifications" }));

    await expect(
      group.getByRole("textbox", { name: "Email address" }),
    ).toHaveAccessibleDescription("Where notification summaries are sent.");
    await expect(
      group.getByRole("combobox", { name: "Frequency" }),
    ).toBeVisible();
  },
});
