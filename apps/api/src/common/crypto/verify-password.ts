export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const parts = storedHash.split(":");
  if (parts.length !== 2) {
    return false;
  }

  const [saltHex, expectedHashHex] = parts;
  if (!saltHex || !expectedHashHex) {
    return false;
  }

  const saltMatches = saltHex.match(/.{1,2}/g);
  if (!saltMatches) {
    return false;
  }

  const saltBytes = new Uint8Array(
    saltMatches.map((byte) => Number.parseInt(byte, 16)),
  );

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );

  const actualHashHex = Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return actualHashHex === expectedHashHex;
}
