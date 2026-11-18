"use client";

import { apiToast } from "@3lineas/groovepack/api-toast";
import { useForm } from "@formisch/react";
import { useRouter } from "next/navigation";
import { registerAction } from "@/actions/auth/register.action";
import { RegisterSchema } from "@/app/(auth)/register/schemas/register.schema";
import type { RegisterInput } from "@/app/(auth)/register/types/register-input.type";

export function useRegister() {
  const router = useRouter();
  const form = useForm({
    schema: RegisterSchema,
  });

  const onSubmit = async (values: RegisterInput) => {
    await apiToast({
      action: () => registerAction(values),
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  return {
    form,
    onSubmit,
    isSubmitting: form.isSubmitting,
  };
}
