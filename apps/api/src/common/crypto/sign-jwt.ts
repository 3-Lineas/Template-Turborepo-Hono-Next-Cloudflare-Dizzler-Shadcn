import { SignJWT } from "jose";
import type { JwtPayload } from "../../types/common/jwt-payload.type";

export async function signJwt(
  payload: JwtPayload,
  secret: string,
): Promise<string> {
  const key = new TextEncoder().encode(secret);

  return new SignJWT({
    email: payload.email,
    name: payload.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}
