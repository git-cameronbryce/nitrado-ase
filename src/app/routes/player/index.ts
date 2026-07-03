import type { KyInstance } from "ky";
import { http } from "@/app/routes/http";
import { ban, unban } from "@/app/routes/player/logic";

export class PlayerRouter {
  private readonly http: KyInstance;

  constructor(private readonly token: string) {
    this.http = http.extend({
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  unban(uname: string, id: number) {
    return unban(this.http, uname, id);
  }

  ban(uname: string, id: number) {
    return ban(this.http, uname, id);
  }
}
