import * as v from "valibot";
import { describe, expect, it } from "vitest";
import { LoginDto } from "@/dtos/auth/login.dto";
import { RegisterDto } from "@/dtos/auth/register.dto";
import { UserResponseDto } from "@/dtos/users/user-response.dto";

describe("Auth & User DTOs", () => {
  it("normaliza y valida LoginDto correctamente", () => {
    const result = v.safeParse(LoginDto, {
      email: "  USER@Example.COM  ",
      password: "secret123",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.output.email).toBe("user@example.com");
      expect(result.output.password).toBe("secret123");
    }
  });

  it("rechaza RegisterDto con contraseña corta y mensaje en Español", () => {
    const result = v.safeParse(RegisterDto, {
      name: "Ana",
      email: "ana@example.com",
      password: "123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.issues[0]?.message).toContain("al menos 6 caracteres");
    }
  });

  it("sanea UserResponseDto omitiendo password y convirtiendo created_at a ISO", () => {
    const parsed = v.parse(UserResponseDto, {
      id: 1,
      name: "Diego",
      email: "diego@example.com",
      password: "hashed-secret-value",
      created_at: 1700000000,
    });

    expect(parsed).toEqual({
      id: 1,
      name: "Diego",
      email: "diego@example.com",
      createdAt: "2023-11-14T22:13:20.000Z",
    });
    expect("password" in parsed).toBe(false);
  });
});
