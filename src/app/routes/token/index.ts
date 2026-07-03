import { get } from "@/app/routes/token/logic";

export class TokenRouter {
  constructor(private readonly token: string) {}

  get() {
    return get(this.token);
  }
}
