import * as v from "valibot";

export const RegisterDto = v.object({
  name: v.pipe(
    v.string("Por favor, ingresa tu nombre."),
    v.trim(),
    v.minLength(2, "Tu nombre debe tener al menos 2 caracteres."),
    v.maxLength(100, "Tu nombre no puede superar los 100 caracteres."),
  ),
  email: v.pipe(
    v.string("Por favor, ingresa tu correo electrónico."),
    v.trim(),
    v.toLowerCase(),
    v.email("Por favor, ingresa un correo electrónico válido."),
  ),
  password: v.pipe(
    v.string("Por favor, ingresa una contraseña."),
    v.minLength(6, "Tu contraseña debe tener al menos 6 caracteres."),
    v.maxLength(128, "Tu contraseña no puede superar los 128 caracteres."),
  ),
});
