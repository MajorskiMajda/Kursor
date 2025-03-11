// /utils/tokenHelper.ts
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number; // Expiration timestamp
}

export function isTokenValid(token: string): boolean {
  if (!token) return false;

  try {
    const decoded: TokenPayload = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // Valid if not expired
  } catch {
    return false; // Invalid token format
  }
}
