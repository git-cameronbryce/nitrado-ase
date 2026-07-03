import type { KyInstance } from "ky";
import { http } from "@/app/routes/http";
import { get, stop, restart } from "@/app/routes/server/logic";

export class ServerRouter {
  private readonly http: KyInstance;

  constructor(private readonly token: string) {
    this.http = http.extend({
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  restart(id: number) {
    return restart(this.http, id);
  }

  stop(id: number) {
    return stop(this.http, id);
  }

  get() {
    return get(this.http);
  }
}
