"use client";

import { apiToast } from "@3lineas/groovepack/api-toast";
import { useForm } from "@formisch/react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth/login.action";
import { LoginSchema } from "@/app/(auth)/login/schemas/login.schema";
import type { LoginInput } from "@/app/(auth)/login/types/login-input.type";

export function useLogin() {
  const router = useRouter();
  const form = useForm({
    schema: LoginSchema,
  });

  const onSubmit = async (values: LoginInput) => {
    await apiToast({
      action: () => loginAction(values),
      onSuccess: () => {
        router.push("/dashboard");
        router.refresh();
      },
    });
  };

  return {
    form,
    onSubmit,
    isSubmitting: form.isSubmitting,
  };
}
