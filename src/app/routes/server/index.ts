import type { KyInstance } from "ky";
import { http } from "@/app/routes/http";
import { get } from "@/app/routes/server/logic";

export class ServerRouter {
  private readonly http: KyInstance;

  constructor(private readonly token: string) {
    this.http = http.extend({
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  get() {
    return get(this.http);
  }
}
