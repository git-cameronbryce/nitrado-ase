import type { ServerResponse } from "@/app/routes/server/type";
import type { KyInstance } from "ky";

export async function get(http: KyInstance) {
  const response = await http.get("/services");

  return response.json() as Promise<ServerResponse>;
}
