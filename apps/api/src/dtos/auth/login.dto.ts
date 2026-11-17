import * as v from "valibot";

export const LoginDto = v.object({
  email: v.pipe(
    v.string("Por favor, ingresa tu correo electrónico."),
    v.trim(),
    v.toLowerCase(),
    v.email("Por favor, ingresa un correo electrónico válido."),
  ),
  password: v.pipe(
    v.string("Por favor, ingresa tu contraseña."),
    v.minLength(1, "Por favor, ingresa tu contraseña."),
  ),
});
