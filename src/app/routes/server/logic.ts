import type { ServerResponse, ActionResponse } from "@/app/routes/server/type";
import type { KyInstance } from "ky";

export async function restart(http: KyInstance, id: number) {
  const response = await http.post(`/services/${id}/gameservers/restart`);

  return response.json() as Promise<ActionResponse>;
}

export async function stop(http: KyInstance, id: number) {
  const response = await http.post(`/services/${id}/gameservers/stop`);

  return response.json() as Promise<ActionResponse>;
}

export async function get(http: KyInstance) {
  const response = await http.get("/services");

  return response.json() as Promise<ServerResponse>;
}
