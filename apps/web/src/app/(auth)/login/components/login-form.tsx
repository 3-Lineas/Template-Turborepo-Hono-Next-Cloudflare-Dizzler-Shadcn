"use client";

import { Field as FormField, Form } from "@formisch/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useLogin } from "../hooks/use-login";
import { Spinner } from "@/components/ui/spinner";

export function LoginForm() {
  const { form, isSubmitting, onSubmit } = useLogin();

  return (
    <Form of={form} onSubmit={onSubmit} className="grid gap-4">
      <FormField of={form} path={["email"]}>
        {(field) => {
          const invalid = Boolean(field.errors?.length);
          return (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field.props}
                id="email"
                value={field.input ?? ""}
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                disabled={isSubmitting}
                aria-invalid={invalid}
              />
              {invalid && (
                <FieldError errors={field.errors?.map((message) => ({ message }))} />
              )}
            </Field>
          );
        }}
      </FormField>

      <FormField of={form} path={["password"]}>
        {(field) => {
          const invalid = Boolean(field.errors?.length);
          return (
            <Field data-invalid={invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              </div>
              <Input
                {...field.props}
                id="password"
                value={field.input ?? ""}
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isSubmitting}
                aria-invalid={invalid}
              />
              {invalid && (
                <FieldError errors={field.errors?.map((message) => ({ message }))} />
              )}
            </Field>
          );
        }}
      </FormField>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Spinner />}
        Acceder a mi Cuenta
      </Button>
    </Form>
  );
}
