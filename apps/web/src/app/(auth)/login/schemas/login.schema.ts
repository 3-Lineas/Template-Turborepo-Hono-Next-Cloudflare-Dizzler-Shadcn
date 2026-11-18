import * as v from "valibot";

export const LoginSchema = v.object({
  email: v.pipe(
    v.string("Por favor, ingresa tu correo electrónico."),
    v.trim(),
    v.email("Por favor, ingresa un correo electrónico válido."),
  ),
  password: v.pipe(
    v.string("Por favor, ingresa tu contraseña."),
    v.minLength(6, "Tu contraseña debe tener al menos 6 caracteres."),
  ),
});
