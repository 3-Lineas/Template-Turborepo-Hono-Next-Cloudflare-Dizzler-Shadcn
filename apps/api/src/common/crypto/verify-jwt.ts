import { jwtVerify } from "jose";
import type { JwtPayload } from "../../types/common/jwt-payload.type";

export async function verifyJwt(
  token: string,
  secret: string,
): Promise<JwtPayload> {
  const key = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, key);

  return {
    sub: String(payload.sub ?? ""),
    email: String(payload.email ?? ""),
    name: String(payload.name ?? ""),
    iat: payload.iat,
    exp: payload.exp,
  };
}
