import type { PlayerResponse } from "@/app/routes/player/type";
import type { KyInstance } from "ky";

export async function unban(http: KyInstance, uname: string, id: number) {
  const response = await http.delete(
    `/services/${id}/gameservers/games/banlist`,
    {
      json: {
        identifier: uname,
      },
    },
  );

  return response.json() as Promise<PlayerResponse>;
}

export async function ban(http: KyInstance, uname: string, id: number) {
  const response = await http.post(
    `/services/${id}/gameservers/games/banlist`,
    {
      json: {
        identifier: uname,
      },
    },
  );

  return response.json() as Promise<PlayerResponse>;
}
