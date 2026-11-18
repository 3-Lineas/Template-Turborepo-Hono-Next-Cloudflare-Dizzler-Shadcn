"use client";

import { Field as FormField, Form } from "@formisch/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useRegister } from "../hooks/use-register";
import { Spinner } from "@/components/ui/spinner";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";

export function RegisterForm() {
  const { form, isSubmitting, onSubmit } = useRegister();

  return (
    <Form of={form} onSubmit={onSubmit} className="grid gap-4">
      <FormField of={form} path={["name"]}>
        {(field) => {
          const invalid = Boolean(field.errors?.length);
          return (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor="name">Nombre Completo</FieldLabel>
              <Input
                {...field.props}
                id="name"
                value={field.input ?? ""}
                placeholder="Juan Pérez"
                autoComplete="name"
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

      <FormField of={form} path={["email"]}>
        {(field) => {
          const invalid = Boolean(field.errors?.length);
          return (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor="email">Correo Electrónico</FieldLabel>
              <Input
                {...field.props}
                id="email"
                value={field.input ?? ""}
                type="email"
                placeholder="tu@ejemplo.com"
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
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input
                {...field.props}
                id="password"
                value={field.input ?? ""}
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={isSubmitting}
                aria-invalid={invalid}
              />
              <div className="mt-2 text-xs text-muted-foreground p-2 bg-muted/50 rounded-md flex gap-2 items-start">
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  className="w-4 h-4 mt-0.5 shrink-0 text-primary"
                />
                <ul className="list-disc pl-4 space-y-1">
                  <li>Mínimo 6 caracteres</li>
                  <li>Al menos 1 mayúscula (A-Z)</li>
                  <li>Al menos 1 número (0-9)</li>
                  <li>Al menos 1 carácter especial</li>
                </ul>
              </div>
              {invalid && (
                <FieldError errors={field.errors?.map((message) => ({ message }))} />
              )}
            </Field>
          );
        }}
      </FormField>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Spinner />}
        Crear Cuenta
      </Button>
    </Form>
  );
}
