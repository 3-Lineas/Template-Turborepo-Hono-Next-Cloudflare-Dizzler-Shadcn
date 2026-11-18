"use client";

import { apiToast } from "@3lineas/groovepack/api-toast";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerAction } from "@/actions/auth/register.action";
import { RegisterSchema } from "@/app/(auth)/register/schemas/register.schema";
import type { RegisterInput } from "@/app/(auth)/register/types/register-input.type";

export function useRegister() {
  const router = useRouter();
  const form = useForm<RegisterInput>({
    resolver: valibotResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
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
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
  };
}
