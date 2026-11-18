import { describe, expect, it } from "vitest";
import { ensureEmailAvailableAction } from "@/actions/auth/ensure-email-available.action";
import { hashUserPasswordAction } from "@/actions/auth/hash-user-password.action";
import { persistUserAction } from "@/actions/auth/persist-user.action";
import { verifyUserPasswordAction } from "@/actions/auth/verify-user-password.action";
import { duplicateEmailError } from "@/errors/auth/duplicate-email.error";
import { invalidCredentialsError } from "@/errors/auth/invalid-credentials.error";
import type { LoginContext } from "@/types/auth/login-context.type";
import type { RegisterContext } from "@/types/auth/register-context.type";
import { createInMemoryD1 } from "../mocks/in-memory-d1";

describe("Auth Atomic Actions", () => {
  it("persiste un usuario nuevo y rechaza correo duplicado", async () => {
    const db = createInMemoryD1();

    const registerCtx: RegisterContext = {
      db,
      input: {
        name: "Lucía",
        email: "lucia@example.com",
        password: "password123",
      },
    };

    await ensureEmailAvailableAction(registerCtx);
    await hashUserPasswordAction(registerCtx);
    await persistUserAction(registerCtx);

    expect(registerCtx.user?.id).toBe(1);
    expect(registerCtx.user?.email).toBe("lucia@example.com");

    await expect(
      ensureEmailAvailableAction(registerCtx),
    ).rejects.toSatisfy(duplicateEmailError.is);
  });

  it("verifica contraseña correcta y rechaza contraseña incorrecta", async () => {
    const db = createInMemoryD1();

    const registerCtx: RegisterContext = {
      db,
      input: {
        name: "Carlos",
        email: "carlos@example.com",
        password: "my-strong-password",
      },
    };

    await hashUserPasswordAction(registerCtx);
    await persistUserAction(registerCtx);

    const loginCtx: LoginContext = {
      db,
      jwtSecret: "test-secret-at-least-32-chars-long",
      input: {
        email: "carlos@example.com",
        password: "my-strong-password",
      },
      user: {
        id: 1,
        name: "Carlos",
        email: "carlos@example.com",
        password: registerCtx.passwordHash!,
        created_at: 1700000000,
      },
    };

    await expect(
      verifyUserPasswordAction(loginCtx),
    ).resolves.toBe(loginCtx);

    loginCtx.input.password = "wrong-password";
    await expect(
      verifyUserPasswordAction(loginCtx),
    ).rejects.toSatisfy(invalidCredentialsError.is);
  });
});
