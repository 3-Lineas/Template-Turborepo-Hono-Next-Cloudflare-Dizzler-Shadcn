"use client";

import { apiToast } from "@3lineas/groovepack/api-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginAction } from "@/actions/auth/login.action";
import { LoginSchema } from "@/app/(auth)/login/schemas/login.schema";
import type { LoginInput } from "@/app/(auth)/login/types/login-input.type";

export function useLogin() {
  const router = useRouter();
  const form = useForm<LoginInput>({
    resolver: valibotResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
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
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
  };
}
