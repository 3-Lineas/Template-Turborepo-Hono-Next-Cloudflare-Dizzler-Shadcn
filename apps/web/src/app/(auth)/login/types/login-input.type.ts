import type * as v from "valibot";
import type { LoginSchema } from "@/app/(auth)/login/schemas/login.schema";

export type LoginInput = v.InferOutput<typeof LoginSchema>;
