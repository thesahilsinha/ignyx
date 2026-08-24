import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET as string);

export type SessionRole = "admin" | "client";

export interface SessionPayload {
  role: SessionRole;
  clientId?: string;
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}