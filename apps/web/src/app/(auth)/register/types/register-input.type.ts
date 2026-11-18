import type * as v from "valibot";
import type { RegisterSchema } from "@/app/(auth)/register/schemas/register.schema";

export type RegisterInput = v.InferOutput<typeof RegisterSchema>;
