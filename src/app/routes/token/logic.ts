import type { TokenResponse } from "./type";
import ky from "ky";

export async function get(token: string) {
  const response = await ky.get("https://oauth.nitrado.net/token", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.json() as Promise<TokenResponse>;
}
